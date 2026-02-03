// Script to publish all assignments
// Run this from the server directory: node scripts/publish_assignments.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const Assignment = mongoose.model('Assignment', new mongoose.Schema({
    title: String,
    description: String,
    instructions: String,
    courseId: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId,
    dueDate: Date,
    maxGrade: Number,
    isPublished: Boolean,
}, { timestamps: true }));

async function publishAllAssignments() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await Assignment.updateMany(
            { isPublished: false },
            { $set: { isPublished: true } }
        );

        console.log(`✅ Published ${result.modifiedCount} assignments`);

        const allAssignments = await Assignment.find({});
        console.log('\nAll assignments:');
        allAssignments.forEach(a => {
            console.log(`- ${a.title}: isPublished = ${a.isPublished}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

publishAllAssignments();
