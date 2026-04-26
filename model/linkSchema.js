import mongoose from 'mongodb';
import { timeStamp } from 'node:console';

const link = new mongoose.Schema({
    url : { type: String, required: true, trim: true, unique: true },
    vote: { type: Number, default: 0 },
    comment: { type: String, trim: true },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
}, {
    timeStamp: true,
    versionKey: false  
});

const urlSchema = mongoose.model('Link', link);
export default urlSchema;