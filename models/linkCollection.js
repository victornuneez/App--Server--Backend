import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    url : { type: String, required: true, trim: true, unique: true },
    vote: { type: Number, default: 0 },
    comments: [{ type: String,  maxlength: 100 }],
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag', required: true }
}, {
    timestamps: true,
    versionKey: false  
});

const Link = mongoose.model('Link', linkSchema);
export default Link;