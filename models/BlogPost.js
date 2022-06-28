import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date(),
    },
    image: String,
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export { BlogPost };
