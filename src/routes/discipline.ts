import {Router} from 'express';
import { createDiscip, deleteDiscip, getDiscipline, getDisciplinesByFaculty, getDisciplinesByProfessor, updateDiscip } from '../controllers/discipline';
import { isAuthenticated, isProfessor } from '../middleware/userStatus';

export default (router: Router) =>{
    router.post('/discipline/post', isAuthenticated, isProfessor, createDiscip);
    router.get('/discipline/:id',isAuthenticated, getDiscipline);
    router.get('/disciplines/professor/:id',isAuthenticated, getDisciplinesByProfessor);
    router.get('/disciplines/faculty/:faculty',isAuthenticated, getDisciplinesByFaculty);
    router.delete('/discipline/delete/:id', isAuthenticated, isProfessor,deleteDiscip);
    router.patch('/discipline/update/:id', isAuthenticated, isProfessor,updateDiscip);
}