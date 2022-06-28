export const validateMiddleware = (req, res, next) => {
    if (
        req.body.body == false ||
        req.body.title == false ||
        req.body.image == false
    ) {
        res.redirect('https://facebook.com');
    }
    next();
};
