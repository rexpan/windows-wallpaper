// const request = require('request');
// const cheerio = require('cheerio');

const url = require('url');

const imgHosts = [
    "i.redd.it",
    "i.reddituploads.com",

    "i.imgur.com",

    "c1.staticflickr.com",
    "c2.staticflickr.com",
    "c3.staticflickr.com",
    "c4.staticflickr.com",
    "c5.staticflickr.com",
    "c6.staticflickr.com",
    "c7.staticflickr.com",
    "c8.staticflickr.com",
    "c9.staticflickr.com",

    "drscdn.500px.org",
];

module.exports = { getUrl };

function getUrl(source) {
    const u = url.parse(source);
    if (imgHosts.includes(u.hostname)) {
        return source;
    }

    if (u.hostname === "imgur.com") {
        if (/^\/\w+$/.test(u.pathname)) {
            u.hostname = "i.imgur.com"
            u.pathname = u.pathname + ".jpg";
            return url.format(u);
        } else {
            console.log(source);
            debugger;
        }
    }

    console.log(source);
    debugger;
}

if (false) {
    console.log(getUrl(`http://imgur.com/jSSYWsp`));
    console.log(getUrl(`https://i.redd.it/cnoey0cpx5ix.jpg`));
    console.log(getUrl(`https://c1.staticflickr.com/9/8274/29244086936_18daff64c2_o.jpg`));
    console.log(getUrl(`https://www.flickr.com/photos/laurajacobsen/27116005151/in/photolist-Hj9BCc-dqZHR2-roHVnP-a59zEw-ahpVVE-edgi43-aden1q-dWm2Eh-6FMbWC-6dJXZ5-hmTUD1-r7gBwo-rqLmvU-piDyHR-8YcJEj-eGiouK-8YcJMh-8YcJRd-7gs8Mp-6FM8dC-7HwtVF-r5wtxD-cvDb2S-6FGZmX-7gs8V4-7X6sdv-jkpa9J-6FM2ey-roJ2Qt-8uJzb2-4CzKMh-boX6jU-6FM4zG-g7tSQR-6FM7yj-oE24qn-oCfWS1-nwe1TN-qZq4fU-r7gBCL-HjadKr-oE23PT-oE58r5-8Y9GAz-8mtaC6-cKUpVN-6FM51S-8Y9Gu2-822zmv-bWLDE4/lightbox/`));
    console.log(getUrl(`http://imgur.com/gUFBSX1`));
    console.log(getUrl(`https://i.redd.it/yqoltwv0l8ix.jpg`));
    console.log(getUrl(`https://i.redd.it/yf87harfn8ix.png`));
    console.log(getUrl(`http://i.imgur.com/g18aqVb.jpg`));
    console.log(getUrl(`https://i.reddituploads.com/8ee16ecf229c45fb828fd10e56666c4b?fit=max&h=1536&w=1536&s=ef84ea9052ba27adad37c7f1c12ab11e`));
    console.log(getUrl(`http://i.imgur.com/3anUUlG.jpg`));
    console.log(getUrl(`http://i.imgur.com/MM0khy6.jpg`));
    console.log(getUrl(`https://i.redd.it/5ssprkrp19ix.jpg`));
    console.log(getUrl(`https://i.redd.it/ajcwv3w183ix.jpg`));
    console.log(getUrl(`https://i.redd.it/chwmodxv57ix.jpg`));
    console.log(getUrl(`https://i.redd.it/65y57qyxe8ix.jpg`));
    console.log(getUrl(`https://i.redd.it/caov52ulz7ix.jpg`));
    console.log(getUrl(`https://www.flickr.com/photos/jameslopez/29305387295/sizes/o/`));
    console.log(getUrl(`https://i.redd.it/6atelr93z7ix.jpg`));
    console.log(getUrl(`https://i.redd.it/qdmrw7gtv8ix.jpg`));
    console.log(getUrl(`https://i.redd.it/iu1riyviz3ix.jpg`));
    console.log(getUrl(`http://i.imgur.com/hbYLtRx.jpg`));
    console.log(getUrl(`http://i.imgur.com/LXvtX5v.jpg`));
    console.log(getUrl(`http://drscdn.500px.org/photo/169678297/q%3D80_m%3D2000/130be89e89a2c879b817d86088f884a8`));
    console.log(getUrl(`http://i.imgur.com/pGCpd7a.jpg`));
    console.log(getUrl(`https://i.reddituploads.com/97d61a191ba54357ace9d817e8ee24dc?fit=max&h=1536&w=1536&s=8bb0cd5eed01b66a2bdc6af5899a2ad8`));
}

