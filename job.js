const fs = require('fs');

const wallpaper = require('wallpaper');
const duration = 7*1000;

fs.readdir(`./img/`, (err, files) => {
    if (err) {
        console.log(err, err.stack);
        return process.exit(1);
    }

    let i = 0;
    changeWallpaper(0);

    function changeWallpaper() {
        const file = `./img/${files[i]}`;
        wallpaper.set(file).then(() => {
            console.log('changed wallpaper to %s', file);
        });

        i = i+1;
        setTimeout(changeWallpaper, duration);
    }
});
