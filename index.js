var fs = require('fs');


const d = new Date();
const year=d.getFullYear();
const month=d.getMonth();
const day=d.getDate();

var dir = `./upload/${year}-${month}-${day}`;


if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

