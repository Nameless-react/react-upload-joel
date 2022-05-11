import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: String,
        public_id: String
    }
});

export default mongoose.model("post", schema)