import express from 'express';
import dotenv from 'dotenv/config'
import viewEngine from './viewEngine';
import initWebRoute from './route/webRoute';

const app = express();
const port = process.env.PORT;

viewEngine(app);
initWebRoute(app)

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
