import {Router} from 'express';
import { createPlan, deletePlan, getFacultyPlan, getOneStudyPlan, updatePlan } from '../controllers/studyPlan';
import { isAuthenticated, isProfessor } from '../middleware/userStatus';

export default (router: Router) =>{
    router.post('/study-plan/post',isAuthenticated, isProfessor, createPlan);
    router.get('/study-plan/:id',isAuthenticated, getOneStudyPlan);
    router.get('/study-plan/:faculty/:course',isAuthenticated, getFacultyPlan);
    router.delete('/study-plan/delete/:faculty/:course',isAuthenticated, isProfessor, deletePlan);
    router.patch('/study-plan/update/:id',isAuthenticated, isProfessor, updatePlan);
}