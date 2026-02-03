
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/purple_dashboard";

// Define strict minimal schema to interface with existing collection
const quizSchema = new mongoose.Schema({
    title: String,
    isPublished: Boolean
});

const Quiz = mongoose.model('Quiz', quizSchema);

async function publishAllQuizzes() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const result = await Quiz.updateMany(
            {},
            { $set: { isPublished: true } }
        );

        console.log(`Updated ${result.modifiedCount} quizzes to published status.`);
        console.log(`Matched ${result.matchedCount} quizzes.`);

    } catch (error) {
        console.error('Error updating quizzes:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

publishAllQuizzes();
