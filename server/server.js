const app =  require('./app')
require('./config/database');


// Config
const PORT = process.env.PORT || 5000;

// const mongoose =  require('mongoose')
// mongoose.set('strictQuery',false);
// mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`)))
//     .catch((err) => console.log("error", err));


const server = app.listen(PORT, () => {
    console.log(`Server is runing on port: ${PORT}`)
})


process.on('unhandledRejection', (err) => {
    console.log(`unhandledRejection ${err.message}`)
    console.log('Shutting down the server due to Unhandled Promise Rejection')
    
    server.close(() => {
        process.exit(1)
    })
})


