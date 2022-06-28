import { BlogPost } from '../models/BlogPost.js';

const renderHomeController = (req, res) => {
    BlogPost.find({}, (err, posts) => {
        console.log(req.session);
        res.render('index', { posts });
    });
};

export { renderHomeController };
