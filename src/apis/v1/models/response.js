const { v4: uuidv4 } = require('uuid');
const { client } = require('../../../db/cassandra');

const FormModel = function (form) {
    this.title = form.title;
    this.visible = form.visible;
    this.description = form.description;
    this.questions = form.questions;
    this.created_by = form.created_by;
};
const createForm = async (formData) => {
    try {
        const form = new FormModel(formData);

        const query = `INSERT INTO forms (id, title, visible,  description, questions, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [uuidv4(), form.title, form.visible, form.description, form.questions, form.created_by, new Date()];
        console.log(params, 'params');
        await client.execute(query, params, { prepare: true });
        return { message: 'success', status: 201 };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

const getForms = async () => {
    try {
        const query = `SELECT * FROM forms`;
        console.log('quey');
        const res = await client.execute(query);
        return { message: 'success', status: 200, data: res.rows };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

module.exports = { getForms, createForm, FormModel };
