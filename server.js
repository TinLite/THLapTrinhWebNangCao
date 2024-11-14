import express from 'express';
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine';
import initWebRoute from './route/webRoute';
import bodyParser from 'body-parser';
import session from 'express-session';
import sequelizeConnection from './services/sequelizeDB';
import Nhom from './models/SqlNhomModel';
import SanPham from './models/SqlSanphamModel';

const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
    console.log(`${(new Date()).toISOString()} ${req.ip} ${req.method} ${req.url}`)
    next();
})

sequelizeConnection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

viewEngine(app);
initWebRoute(app)

app.use((err, req, res, next) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
