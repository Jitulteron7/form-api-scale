const mongoose = require('mongoose');

const response = new mongoose.Schema(
    {
        form: {
            type: mongoose.Types.ObjectId
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref:'User'
        },
        access: {
            type: String,
            enum: ['public', 'private', 'protected']
        },
        ans: [
            {
                type: {
                    type: String,
                    enum: ['text', 'number', 'multi-choice', 'media']
                },
                label: String,
                options: {
                    type: mongoose.Schema.Types.Mixed
                },
                required: Boolean
            }
        ],
        postBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Response', response);
