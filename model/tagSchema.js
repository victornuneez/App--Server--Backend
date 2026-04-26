import mongoose from 'mongodb';
import { timeStamp } from 'node:console';

const tag = new mongoose.Schema({
    tag : { type: String, required: true, trim: true },
}, {
    timeStamp: true,
    versionKey: false  
});

const Tag = mongoose.model('Tag', tag);
export default Tag;