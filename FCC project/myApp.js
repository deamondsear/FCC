let express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({ "message": "Hello json" });
  }
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time })
});

app.get('/:word/echo', (req, res) => {
  console.log(req.params.word)
  res.json({ echo: req.params.word })
})

app.get('/name', (req, res, next) => {
  req.body = ({ name: `${req.query.first} ${req.query.last}` });
  next()
})

app.post('/name', (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` })
})

app.use('/public', express.static(__dirname + '/public'))




































module.exports = app;
