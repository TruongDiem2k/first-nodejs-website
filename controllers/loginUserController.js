import bcrypt from 'bcrypt';

import { User } from '../models/User.js';

export const loginUserController = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, isSame) => {
                if (isSame) {
                    req.session.userID = user._id;
                    res.redirect('/');
                } else {
                    console.log(error);
                    res.redirect('/login');
                }
            });
        } else {
            console.log(err);
            res.redirect('/login');
        }
    });
};
