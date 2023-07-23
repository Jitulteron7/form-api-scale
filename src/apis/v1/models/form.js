const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const form = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        visible: {
            type: String,
            enum: ['public', 'private']
        },
        desc: {
            type: String,
            required: true
        },
        questions: [
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
        createdBy: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Form', form);
