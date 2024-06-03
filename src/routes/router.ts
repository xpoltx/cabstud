import express from "express";
import user from "./user";
import studentInfo from "./studentInfo";
import discipline from "./discipline";
import studyPlan from "./studyPlan";
import gradebook from "./gradebook";
import authentication from "./authentication";
const router = express.Router();


export default (): express.Router =>{
    user(router);       
    authentication(router); 
    studentInfo(router); 
    discipline(router); 
    studyPlan(router); 
    gradebook(router); 
    return router;
}

