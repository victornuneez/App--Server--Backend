import mongoose from 'mongoose';

const link = new mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    url : { type: String, required: true, trim: true, unique: true },
    vote: { type: Number, default: 0 },
    comment: { type: String, trim: true, default:"Sin comentarios aun" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
}, {
    timestamps: true,
    versionKey: false  
});

const Link = mongoose.model('Link', link);
export default Link;