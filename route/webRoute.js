import { Router } from "express";
import HomeController from '../controllers/HomeController'
import * as AboutController from '../controllers/AboutController'
import * as ContactController from '../controllers/ContactController'
import AuthController from "../controllers/AuthController";
import ParamUserIdAuthorization from "../middlewares/ParamUserIdAuthorization";
import UserApiController from "../controllers/api/UserApiController";
import AuthenticationApiController from "../controllers/api/AuthenticationApiController";
import NhomSpApiController from "../controllers/api/NhomSpApiController";
import SanPhamApiController from "../controllers/api/SanPhamApiController";

const router = Router();

export default function initWebRoute(app) {

    // Api Routes
    router.post("/api/login", AuthenticationApiController.login)
    router.post("/api/logout", AuthenticationApiController.logout)

    router.get("/api/users", UserApiController.getAll)
    router.post("/api/users", UserApiController.insertOne)
    // router.use("/api/users/:username", ParamUserIdAuthorization);
    router.get("/api/users/:username", UserApiController.getOne)
    router.put("/api/users/:username", UserApiController.updateOne)
    router.delete("/api/users/:username", UserApiController.removeOne)

    router.get("/api/nhomsp", NhomSpApiController.getAll);

    router.get("/api/sanpham", SanPhamApiController.getAll);
    router.get("/api/sanpham/:id", SanPhamApiController.getOne);

    router.get("/", HomeController.get)

    // Auth routes
    router.get("/login", AuthController.getLogin)
    router.post("/login", AuthController.postLogin)

    // User routes
    router.post("/users/create", HomeController.createNewUser);
    router.use("/users/:username", ParamUserIdAuthorization);
    router.get("/users/:username", HomeController.getOneUser);
    router.post("/users/:username", HomeController.updateOneUser)
    router.post("/users/:username/changePassword", HomeController.updateOneUserPassword)
    router.post("/users/:username/delete", HomeController.deleteOneUser)

    // Other pages
    router.get("/about", AboutController.get)
    router.get("/contact", ContactController.get)

    app.use(router);
}