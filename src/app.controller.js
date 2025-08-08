import { connectionDB } from "./db/connection.js"
import authRouter from './module/auth/auth.controller.js'
import userController from './module/user/user.controller.js'
import noteController from './module/note/note.controller.js'
function bootstrap(app,express){
    connectionDB()
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/users', userController)
    app.use('/notes', noteController)
    
    
}

export default bootstrap