const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"],
    },
},
    { timestamps: true }
);

const blogModel = mongoose.model('Blog', BlogSchema);

module.exports = blogModel;
