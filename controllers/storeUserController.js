import { User } from '../models/User.js';

export const storeUserController = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/signup');
        } else console.log(user);

        res.redirect('/');
    });
};
