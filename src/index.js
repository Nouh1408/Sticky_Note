import bootstrap from './app.controller.js'
import express from 'express' 
const app = express()
const port =3000

bootstrap(app,express)

app.listen(port, ()=>{
    console.log('====================================');
    console.log("Server running on port,", port);
    console.log('====================================');
})