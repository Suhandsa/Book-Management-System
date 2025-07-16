import express from "express";
import bodyParser from "body-parser";
import {PORT,password,database,user,host } from "./config.js";
import pg from "pg";
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"

const app = express();
const db= new pg.Client({
    user: user,
    host: host,
    database:database,
    password:password ,
    port: 5433,
});


app.use(cors());
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['content-Type'],
// }));
db.connect((err) =>
    {
        if (err) {
            console.error('connection error', err);
            process.exit(1);
            }
            app.listen(PORT,()=>{
                     console.log(`Server is running on port:${PORT}`);  
            }); 
            console.log('connected to database');
    });
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
app.use(express.json());

app.use(express.static("public"));
app.use("/book",bookRoute);
export default db;

