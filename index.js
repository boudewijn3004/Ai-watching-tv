const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');

const credentials = {
  key: fs.readFileSync('/Users/boudewijnnoordhuis/localhost-key.pem'),
  cert: fs.readFileSync('/Users/boudewijnnoordhuis/localhost.pem'),
};

const app = express();


// http.createServer(app).listen(8000);
// type https://localhost:443
https.createServer(credentials, app).listen(443);

app.use(cors());
app.use(express.static('./app'));
app.get('/', function(req, res) {
    // console.log('app.get slash');
    let file = fs.readFileSync('index.html', {encoding: 'utf8'});
    res.send(file);
   });            



// working example openai API 

//    const got = require('got');
// const prompt = `Artist: Queen\n\nLyrics:\n`;

// (async () => {
//   const url = 'https://api.openai.com/v1/engines/davinci/completions';
//   const params = {
//     "prompt": prompt,
//     "max_tokens": 160,
//     "temperature": 0.7,
//     "frequency_penalty": 0.5
//   };
//   const headers = {
//     'Authorization': `Bearer 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`,
//   };

//   try {
//     const response = await got.post(url, { json: params, headers: headers }).json();
//     output = `${prompt}${response.choices[0].text}`;
//     console.log(output);
//   } catch (err) {
//     console.log(err);
//   }
// })();