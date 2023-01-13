const mongoose =  require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:"./config/.env"})


mongoose.set('strictQuery',false);
mongoose.
    connect(process.env.DATABASE,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => console.log('Connected to mongoDB'))
    .catch((err) => console.log('Failed to connect to mongoDB', err))