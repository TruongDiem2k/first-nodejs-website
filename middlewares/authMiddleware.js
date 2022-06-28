import { User } from '../models/User.js';

export const authMiddleware = (req, res, next) => {
    User.findById(req.session.userID, (error, user) => {
        if (error || !user) return res.redirect('/login');
        next();
    });
};
