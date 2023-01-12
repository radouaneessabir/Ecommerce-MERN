const mongoose =  require('mongoose')
const app =  require('../app')
const PORT = process.env.PORT || 5000;


const connectDatabase = () => {
    mongoose.set('strictQuery',false);
    mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => app.listen(PORT, () => console.log(`Server is runing on port: ${PORT}`)))
            .catch((err) => console.log("error", err));

    // mongoose.connection.on('error', (err) => {
    //     console.log('Mongoose Connection Eroor: ', err.message)
    // })
    
    // mongoose.connection.once('open', () => {
    //     console.log('MongoDB Connected')
    // })
}


module.exports = connectDatabase