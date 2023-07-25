const User = require('../models/user');
const Form = require('../models/form');
const Response = require('../models/response');

class UserController {
    core = {
        createUser: async (req, res) => {
            try {
                const userData = req.body;
                const response = await User.createUser(userData);
                res.json({ message: response.message, status: response.status });
            } catch (error) {
                throw Error('Error creating user', error);
            }
        },

        createForm: async (req, res) => {
            try {
                const formData = req.body;
                const response = await Form.createForm(formData);
                res.json({ message: response.message, status: response.status });
            } catch (error) {
                console.log(error);
                throw Error('Error creating form', error);
            }
        },

        saveResponse: async (req, res) => {
            try {
                const resData = req.body;
                const response = await Response.postResponse(resData);
                res.json({ message: response.message, status: response.status, data: response.data });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        //get

        getUsers: async (req, res) => {
            try {
                const response = await User.getUsers();
                res.json({ message: response.message, status: response.status, data: response.data });
            } catch (error) {
                throw Error('Error get user', error);
            }
        },

        getForms: async (req, res) => {
            try {
                const response = await Form.getForms();
                res.json({ message: response.message, status: response.status, data: response.data });
            } catch (error) {
                throw Error('Error get forms', error);
            }
        },

        getResponse: async (req, res) => {
            try {
                const response = await Response.getResponses();
                res.json({ message: response.message, status: response.status, data: response.data });
            } catch (error) {
                res.status(500).json(error);
            }
        },

        getFormResponse: async (req, res) => {
            try {
                const formid = '03a46b91-d968-4481-94f8-6338ec04a200';
                const userid = 'a07d8afd-8030-478e-833f-c8172ae5f5f5';
                const response = await User.getFormResponse(formid, userid);
                res.json({ message: response.message, status: response.status, data: response.data });
            } catch (error) {
                res.status(500).json(error);
            }
        }
    };

    plugins = {};

    register(plugin) {
        const { name, exec } = plugin;
        this.plugins[name] = exec;
    }
}

module.exports = { UserController };
