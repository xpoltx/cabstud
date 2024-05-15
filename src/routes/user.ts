import { Router } from "express";
import { deleteUser, getAllProfessors, getAllStudents, updateUser } from "../controllers/users";
import { isAuthenticated, isProfessor } from "../middleware/userStatus";


export default (router: Router)=>{
    router.get('/students',isAuthenticated, getAllStudents);
    router.get('/professors',isAuthenticated, getAllProfessors);
    router.delete('/user/delete/:email',isAuthenticated,isProfessor, deleteUser);
    router.patch('/user/update/:email',isAuthenticated,isProfessor, updateUser);
};