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
      );
      
      `;

    const answerUDTQuery = `
    CREATE TYPE IF NOT EXISTS answer (
      type TEXT,
      label TEXT,
      options MAP<TEXT, TEXT>, 
      required BOOLEAN
    );
    `;

    // Index creation queries
    const indexQuery1 = `
  CREATE INDEX IF NOT EXISTS idx_forms_created_by ON forms (created_by);
`;
    const indexQuery2 = `
  CREATE INDEX IF NOT EXISTS idx_response_form ON responses (form);
`;
    const indexQuery3 = `
  CREATE INDEX IF NOT EXISTS idx_response_user ON responses (user);
`;

    const indexQuery4 = `
  CREATE INDEX IF NOT EXISTS idx_response_post_by ON responses (post_by);
`;

    try {
        //clear all table
        // await client.execute(`DROP TABLE IF EXISTS users`);
        // await client.execute(`DROP TABLE IF EXISTS forms`);
        // await client.execute(`DROP TABLE IF EXISTS responses`);

        //crate UDTs
        await client.execute(questionUDTQuery);
        await client.execute(answerUDTQuery);
        // create table
        await client.execute(query1);
        await client.execute(query2);
        await client.execute(query3);

        // Create indexes
        await client.execute(indexQuery1);
        await client.execute(indexQuery2);
        await client.execute(indexQuery3);
        await client.execute(indexQuery4);

        console.log('Table created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
}
module.exports = { client, createTable };

// Run the async function
