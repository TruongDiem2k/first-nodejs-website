import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import expressSession from 'express-session';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { validateMiddleware } from './middlewares/validateMiddleware.js';
import { redirectIfLoggedMiddleware } from './middlewares/redirectIfLoggedMiddleware.js';

import { createPostController } from './controllers/createPostController.js';
import { renderHomeController } from './controllers/renderHomeController.js';
import { renderContactController } from './controllers/renderContactController.js';
import { renderPostController } from './controllers/renderPostController.js';
import { renderAboutController } from './controllers/renderAboutController.js';
import { renderRegisterController } from './controllers/renderRegisterController.js';
import { renderLoginController } from './controllers/renderLoginController.js';
import { storePostController } from './controllers/storePostController.js';
import { storeUserController } from './controllers/storeUserController.js';
import { loginUserController } from './controllers/loginUserController.js';
import { logoutController } from './controllers/logoutController.js';
// config project
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware);
app.use(
    expressSession({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
    })
);

app.set('view engine', 'ejs');

app.listen(4000, () => {
    console.log('http://localhost:4000');
});

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
});

// set routes
app.get('/', renderHomeController);

app.get('/contact', renderContactController);

app.get('/post/:id', renderPostController);

app.get('/about', renderAboutController);

app.get('/posts/new', authMiddleware, createPostController);

app.get('/signup', redirectIfLoggedMiddleware, renderRegisterController);

app.get('/login', redirectIfLoggedMiddleware, renderLoginController);

app.get('/logout', logoutController);

app.post('/posts/store', authMiddleware, storePostController);

app.post('/users/register', redirectIfLoggedMiddleware, storeUserController);

app.post('/users/login', redirectIfLoggedMiddleware, loginUserController);

global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userID;

    next();
});

app.use((req, res) => {
    res.render('notfound');
});
