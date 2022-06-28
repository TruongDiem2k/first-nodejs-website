import { BlogPost } from '../models/BlogPost.js';

export const renderPostController = (req, res) => {
    BlogPost.findById(req.params.id, (err, posts) => {
        res.render('post', { posts });
    });
}