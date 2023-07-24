const { Client } = require('cassandra-driver');

const client = new Client({
    cloud: {
        secureConnectBundle: 'src/db/secure-connect-form-api.zip'
    },
    credentials: {
        username: 'SHFZOqruagzgqTUlpkpgbSwR',
        password: 'vtoF0Bn_,ja3j4gCG1uAc_8nbY+CblS9n8JrlyyH+I5wK3b_Gtxx6u2dnUzHx3gQau6ad8svpl4DXszBa8sJFGBy3wA2tjWIcmscW.9gXaEvHXJkI83uC0eXeKoGjp-Z'
    },
    keyspace: 'my_keyspace'
});

async function createTable() {
    const query1 = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name TEXT,
        email TEXT,    
        password TEXT
      )
    `;

    const query2 = `
    CREATE TABLE IF NOT EXISTS forms (
        id UUID PRIMARY KEY,
        title TEXT,
        visible TEXT,
        description TEXT,
        questions LIST<FROZEN<question>>,
        created_by UUID,
        created_at TIMESTAMP
      );
      
      `;
      const questionUDTQuery = `
      CREATE TYPE IF NOT EXISTS question (
        type TEXT,
        label TEXT,
        options MAP<TEXT, TEXT>,
        required BOOLEAN
      );
    `;
    const query3 = `
    CREATE TABLE IF NOT EXISTS responses (
        id UUID PRIMARY KEY,
        form UUID,
        user UUID,
        access TEXT,
        ans LIST<FROZEN<answer>>,
        post_by UUID,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      );
      
      CREATE TYPE IF NOT EXISTS answer (
        type TEXT,
        label TEXT,
        options MAP<TEXT, TEXT>, 
        required BOOLEAN
      );`;

    try {
        await client.execute(query1);
        await client.execute(questionUDTQuery);
        await client.execute(query2);
        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
}
module.exports = { client, createTable };

// Run the async function
