import {deleteUser, getUserData, updateUser} from './service/user.service.js'
import { Router } from 'express'
const router = Router()
router.patch('/updateuser', updateUser)
router.delete('/deleteuser', deleteUser)
router.get('/getUser',getUserData)
export default router
