import express from 'express';
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine';
import initWebRoute from './route/webRoute';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
    console.log(`${req.ip} ${req.method} ${req.url}`)
    next();
})

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))
app.use(bodyParser.urlencoded({ extended: false }))

viewEngine(app);
initWebRoute(app)

app.use((err, req, res, next) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
