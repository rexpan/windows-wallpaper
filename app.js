const FeedParser = require('feedparser');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const {getUrl} = require('./getUrl.js');

// https://www.reddit.com/r/EarthPorn/comments/gtdeu/howto_set_rearthporn_to_be_your_desktop_wallpaper/
// https://www.reddit.com/r/EarthPorn/search.rss?q=1920x1080&restrict_sr=on
const req = request('https://www.reddit.com/r/EarthPorn+CityPorn+SpacePorn+WaterPorn/.rss');
req.setHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36');
req.setHeader('accept', 'text/html,application/xhtml+xml');

const feedparser = new FeedParser();

req.on('error', done);
req.on('response', function(res) {
  const stream = this;
  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
  const charset = getParams(res.headers['content-type'] || '').charset;
  res = maybeTranslate(res, charset);

  stream.pipe(feedparser);
});

feedparser.on('error', done);
feedparser.on('end', done);
feedparser.on('readable', function() {
    // This is where the action is!
    const stream = this;
    const meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance
    let post;
    while (post = stream.read()) {
        // console.log(JSON.stringify(post, ' ', 4));
        const $ = cheerio.load(post.description);
        const source = $("a[href]").filter((i, $a) => $($a).text() === "[link]").attr("href");

        const postId = post["atom:id"]["#"];
        const file = `./img/${postId}.jpg`;
        if (fs.existsSync(file)) {
            console.log("downloaded [%s] [%s]", postId, source);
        } else {
            const u = getUrl(source);
            if (u == null) {
                console.log("unknow how to get img url [%s] [%s]", postId, source);
            } else {
                request(u).pipe(fs.createWriteStream(file)).on("error", () => {
                    fs.unlink(file);
                });
            }
        }
    }
});

function maybeTranslate (res, charset) {
  var iconv;
  // Use iconv if its not utf8 already.
  if (!iconv && charset && !/utf-*8/i.test(charset)) {
    try {
      iconv = new Iconv(charset, 'utf-8');
      console.log('Converting from charset %s to utf-8', charset);
      iconv.on('error', done);
      // If we're using iconv, stream will be the output of iconv
      // otherwise it will remain the output of request
      res = res.pipe(iconv);
    } catch(err) {
      res.emit('error', err);
    }
  }
  return res;
}

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function done(err) {
  if (err) {
    console.log(err, err.stack);
    return process.exit(1);
  }
  // process.exit();
}
