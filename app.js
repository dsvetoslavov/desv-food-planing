const express = require('express');
const handlebars = require('express-handlebars');

const port = 3000;

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(port, () => {
    console.info(`Express app running on http://localhost:${port}`);
})