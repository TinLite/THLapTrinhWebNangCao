import { Router } from "express";
import * as HomeController from '../controllers/HomeController'
import * as AboutController from '../controllers/AboutController'
import * as ContactController from '../controllers/ContactController'
const router = Router();
export default function initWebRoute(app) {
    router.get("/", HomeController.get)
    router.get("/about", AboutController.get)
    router.get("/contact", ContactController.get)

    app.use(router);
}