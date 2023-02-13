function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  })
}

async function main(duration) {
  await sleep(duration);
}

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use('*', function (req, res) {
  if (req.params[0] === '/public/css/common.css') {
    setTimeout(() => {
      res.setHeader('content-type', 'text/css');
      res.send(fs.readFileSync(path.join(__dirname, req.params[0])));
    }, 3000)
  } else if (req.params[0] === '/public/js/test.js') {
    setTimeout(() => {
      res.setHeader('content-type', 'text/js');
      res.send(fs.readFileSync(path.join(__dirname, req.params[0])))
    }, 0000)
  } else {
    res.send('success')
  }
})

app.listen(3000, () => console.log('working'))