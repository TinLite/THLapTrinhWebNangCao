import { Router } from "express";
import HomeController from '../controllers/HomeController'
import * as AboutController from '../controllers/AboutController'
import * as ContactController from '../controllers/ContactController'
const router = Router();
export default function initWebRoute(app) {
    router.get("/", HomeController.get)
    router.post("/users/create", HomeController.createNewUser)
    router.get("/users/:username", HomeController.getOneUser)
    router.post("/users/:username", HomeController.updateOneUser)
    router.post("/users/:username/changePassword", HomeController.updateOneUserPassword)
    router.post("/users/:username/delete", HomeController.deleteOneUser)

    router.get("/about", AboutController.get)
    router.get("/contact", ContactController.get)

    app.use(router);
}