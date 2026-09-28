import app from './src/app.js';
import dbConnect from './src/db/db.js';
 
await dbConnect();


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});