import express from 'express';
import dotenv from 'dotenv/config'
import date from './date';
import getURL from './getURL';
import viewEngine from './viewEngine';

const app = express();
const port = process.env.PORT;

viewEngine(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/date', (req, res) => {
    res.send(date());
});

app.get('/ejs', (req, res) => {
    res.render('test');
});

app.get('/geturl', (req, res) => {
    res.set('Content-Type', 'text/html;charset=utf-8');
    res.write(getURL.getPath(req));
    res.write('<br>');
    res.write(getURL.getParamsURL(req));
    res.send();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
