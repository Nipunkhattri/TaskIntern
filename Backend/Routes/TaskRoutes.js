import express from "express";
import {TaskCreation,GetAllTask,GetSingleTask,UpdateTask,DeleteTask} from '../Controller/TaskController.js'
const router = express.Router();

router.post('/CreateTask',TaskCreation)
router.get('/GetAllTask',GetAllTask)
router.get('/GetSingleTask/:id',GetSingleTask)
router.put('/UpdateTask/:id',UpdateTask)
router.delete('/DeleteTask/:id',DeleteTask)
export default router;
