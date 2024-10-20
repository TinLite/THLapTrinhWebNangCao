import express from 'express';
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine';
import initWebRoute from './route/webRoute';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))

viewEngine(app);
initWebRoute(app)


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
