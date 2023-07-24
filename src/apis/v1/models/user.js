const { v4: uuidv4 } = require('uuid');
const { client } = require('../../../db/cassandra');

const UserModel = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};
const createUser = async (userData) => {
    try {
        const { name, password, email } = new UserModel(userData);
        const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
        const params = [uuidv4(), name, email, password];
        await client.execute(query, params, { prepare: true });
        return { message: 'success', status: 201 };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

const getUsers = async () => {
    try {
        console.log('strick');
        const query = `SELECT * FROM users`;

        const res = await client.execute(query);
        return { message: 'success', status: 200, data: res.rows };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

const getFormResponse = async (formId, userId) => {
    try {
        console.log(formId, userId);
        const query = `SELECT * FROM responses WHERE form = ? AND user = ?;`;
        const params = [formId, userId];
        const res = await client.execute(query, params);
        return { message: 'success', status: 200, data: res.rows };
    } catch (error) {
        console.log(error, 'error');
        throw new Error('Create User Error', error);
    }
};

module.exports = { getUsers, getFormResponse, createUser, UserModel };
