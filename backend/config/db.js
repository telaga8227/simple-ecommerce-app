import mongoose from 'mongoose';

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Mongo db connected successsfully')
    }
    catch(error){
        console.error(`Error: ${error.message}`)

    }
}

export default connectDB