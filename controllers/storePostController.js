
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { BlogPost } from '../models/BlogPost.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const storePostController = (req, res) => {
    let image = req.files.image;
    image.mv(
        path.resolve(__dirname, 'public/upload', image.name),
        function (err) {
            // model creates a new doc with browser data
            BlogPost.create(
                { ...req.body, image: '/upload/' + image.name },
                (error, blogpost) => {
                    res.redirect('/');
                }
            );
            console.log({ ...req.body, image: '/upload/' + image.name });
        }
    );
};
