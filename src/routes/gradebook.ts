import {Router} from 'express';
import { createGrade, deleteGrades, getGrade, getStudentGrades, updateGrade } from '../controllers/gradebook';
import { getDisciplineById } from '../db/discipline';
import { isAuthenticated, isProfessor } from '../middleware/userStatus';

export default (router: Router) =>{
    router.post('/gradebook/grade',isAuthenticated, isProfessor, createGrade);
    router.get('/gradebook/:id',isAuthenticated, getGrade);
    router.get('/gradebook/student/:studentId',isAuthenticated, getStudentGrades);
    router.get('/gradebook/discipline/:disciplineId',isAuthenticated, getDisciplineById);
    router.delete('/gradebook/delete/:studentId',isAuthenticated, isProfessor, deleteGrades);
    router.patch('/gradebook/update/:id',isAuthenticated, isProfessor, updateGrade);
}