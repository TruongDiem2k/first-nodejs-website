import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

export const User = mongoose.model('User', UserSchema);
