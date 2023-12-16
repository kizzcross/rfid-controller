const { BigQuery } = require('@google-cloud/bigquery');

const projectId = 'rfid-5ec7f';
const datasetId = 'rfid-5ec7f.users';
const tableId = 'rfid-5ec7f.users.students';


const bigquery = new BigQuery();

async function runQuery(userClass) {
    const query = `SELECT name FROM \`users.students\` WHERE class = ${userClass}`
    const jobConfig = {
        query: query,
    };

    const job = await bigquery.jobs().query(jobConfig);

    const rows = await job.result();

    console.log(rows);
}

runQuery('Class A');
