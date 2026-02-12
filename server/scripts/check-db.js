import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const checkDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/purple_dashboard';
    console.log(`Testing connection to: ${uri}`);

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ MongoDB Connection SUCCESS');
        await mongoose.disconnect();
    } catch (err) {
        console.error('❌ MongoDB Connection FAILED');
        console.error(err.message);

        // Try fallback to 127.0.0.1 if localhost failed
        if (uri.includes('localhost')) {
            const fallbackUri = uri.replace('localhost', '127.0.0.1');
            console.log(`\nRetrying with fallback: ${fallbackUri}`);
            try {
                await mongoose.connect(fallbackUri, {
                    serverSelectionTimeoutMS: 5000
                });
                console.log('✅ MongoDB Connection SUCCESS (with 127.0.0.1)');
                await mongoose.disconnect();
            } catch (fallbackErr) {
                console.error('❌ MongoDB Fallback Connection FAILED');
                console.error(fallbackErr.message);
            }
        }
    }
};

checkDB();
