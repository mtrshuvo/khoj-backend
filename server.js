require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.MONGODB_SERVER.replace("<password>",process.env.DB_PASSWORD);
mongoose.connect(DB)
    .then(()=>{
        console.log("Connected to monggoDB");
    })
    .catch(err=> {
        console.log("Connenction Failed");
    })
const port = process.env.PORT || 3001;

// app.use((err, req, res, next)=>{
//     if (res.headersSent){
//         next("There was a problem");
//     }
//     else{
//         if(err){
//             return res.status(500).send(err.message);
//         }else{
//             return res.status(500).send("There was an error");
//         }
//     }
// })
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
})