import { Router } from "express";
import { getStudentInformation, getGroup, deleteStudentInformation, updateStudentInformation, createStudentInformation } from "../controllers/studentInfo";
import { isAuthenticated, isProfessor } from "../middleware/userStatus";


export default (router: Router) =>{
    router.post('/student/post/info',isAuthenticated, isProfessor, createStudentInformation);
    router.get('/student/:studentId',isAuthenticated, getStudentInformation);
    router.get('/group/:groupName', isAuthenticated, getGroup);
    router.delete('/student/delete/:studentId',isAuthenticated, isProfessor, deleteStudentInformation);
    router.patch('/student/update/:studentId', isAuthenticated, isProfessor,updateStudentInformation);
}