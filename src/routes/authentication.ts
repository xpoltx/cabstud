import {Router} from "express";
import { login, register } from "../controllers/authentication";

export default (router: Router)=>{
    router.post('/login', login);
    router.post('/register', register);
}