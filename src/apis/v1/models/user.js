const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        response: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Response'
            }
        ]
    },
    {
        timestamps: true
    }
);

user.pre('save', async function () {});

module.exports = mongoose.model('User', user);
