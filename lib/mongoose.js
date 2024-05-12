import mongoose  from "mongoose";

let isConnected = false;
 export const ConnectToDb= async () =>{

    mongoose.set('strictQuery', true);
    if(!process.env.MONGODB_URI) return    console.log('Invalid MongoDb Url');

    if(isConnected) return console.log("=> using the Existing db connection ")
    
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true;
     console.log('Mongodb is connected')
    } catch (error) {
            console.log("Nhi ho pya connect mongodb se " + error)
    }
 }

