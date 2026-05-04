import mongoose from 'mongoose';
import { timeStamp } from 'node:console';

const tagSchema = new mongoose.Schema({
    name : { type: String, required: true, unique: true, trim: true },
}, {
    timestamps: true,
    versionKey: false  
});

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;