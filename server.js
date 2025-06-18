const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/services', (req, res) => res.render('services'));
app.get('/gallery', (req, res) => res.render('gallery'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/blog', (req, res) => res.render('blog'));

app.post('/contact', (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  };
  fs.appendFile('messages.json', JSON.stringify(data) + '\n', err => {
    if (err) console.error(err);
  });
  res.render('contact', { success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
