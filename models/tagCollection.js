import mongoose from 'mongoose';
import { timeStamp } from 'node:console';

const tag = new mongoose.Schema({
    tag : { type: String, required: true, unique: true, trim: true },
}, {
    timestamps: true,
    versionKey: false  
});

const Tag = mongoose.model('Tag', tag);
export default Tag;