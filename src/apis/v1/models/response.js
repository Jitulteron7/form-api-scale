const { v4: uuidv4 } = require('uuid');
const { client } = require('../../../db/cassandra');

const ResponseModel = function (res) {
    this.form = res.form;
    this.user = res.user;
    this.access = res.access;
    this.ans = res.ans;
    this.post_by = res.post_by;
};
const postResponse = async (resData) => {
    try {
        const responses = new ResponseModel(resData);

        const query = `INSERT INTO responses (id, form, user,  access, ans, post_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [uuidv4(), responses.form, responses.user, responses.access, responses.ans, responses.post_by, new Date()];
        console.log(params, 'params');
        await client.execute(query, params, { prepare: true });
        return { message: 'success', status: 201 };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

const getResponses = async () => {
    try {
        const query = `SELECT * FROM responses`;
        console.log('quey');
        const res = await client.execute(query);
        return { message: 'success', status: 200, data: res.rows };
    } catch (error) {
        throw new Error('Create User Error', error);
    }
};

module.exports = { getResponses, postResponse, ResponseModel };
