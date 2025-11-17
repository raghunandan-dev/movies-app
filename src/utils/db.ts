import mongoose from "mongoose";

// Use environment variable or fallback to hardcoded (for development only)
const MONGOOSE_URI: string | undefined = 
  process.env.MONGODB_URI || 
  process.env.NEXT_PUBLIC_MONGODB_URI ||
  "mongodb+srv://spraghunandan_db_user:45ta9tFH94GQIMWf@cluster0.19h8ya1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if(!MONGOOSE_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

async function dbconnect(){
    if(cached.conn){
        return cached.conn;
    } 
    if(!cached.promise){
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
            // MongoDB Atlas requires SSL/TLS (mongodb+srv:// already uses SSL)
            // For mongodb+srv, SSL is automatically enabled
            // Retry connection on failure
            retryWrites: true,
            // Server selection timeout (increase for slower connections)
            serverSelectionTimeoutMS: 10000,
            // Socket timeout
            socketTimeoutMS: 45000,
            // Connection timeout
            connectTimeoutMS: 10000,
        };
        
        try {
            cached.promise = mongoose.connect(MONGOOSE_URI, opts).then((resp)=>{
                console.log("✅ MongoDB connected successfully");
                return resp;
            });
        } catch (error) {
            console.error("❌ MongoDB connection error:", error);
            cached.promise = null;
            throw error;
        }
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbconnect;