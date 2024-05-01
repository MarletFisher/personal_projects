import * as express from 'express';
const sql = require('mssql');

const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

// Middleware
app.use(express.json());

// SQL Connection
const config = {
  user: 'sa',
  password: 'Patricks321*',
  server: 'localhost',
  port: 1433,
  database: 'PhoneComicDatabase',
  authentication: {
    type: 'default',
  },
  options: {
    encrypt: true,
  },
  trustServerCertificate: true,
};

console.log('Starting...');
connectAndQuery();

async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);

    await poolConnection.query(
      `DELETE FROM TestAppSchema.UserAccount WHERE UserName = 'DucknCover'`
    );
    console.log('Row deleted');

    var insertStatement =
      "INSERT INTO VALUES ('DucknCover', 'password6', 'aaa', 1, '2024-04-23', 'Vince', 'Sanyoto', 16, 13, 'vinyoto@givenuponlife.ca')";

    const result = await poolConnection.request().query(insertStatement);
    console.log(result);

    console.log('Reading rows from the Table...');
    var resultSet = await poolConnection
      .request()
      .query(`SELECT * FROM TestAppSchema.UserAccount`);

    console.log(`${resultSet.recordset.length} rows returned.`);

    // output column headers
    var columns = '';
    for (var column in resultSet.recordset.columns) {
      columns += column + ', ';
    }
    console.log('%s\t', columns.substring(0, columns.length - 2));

    // ouput row contents from default record set
    resultSet.recordset.forEach((row: any) => {
      console.log('%s\t%s', row.FirstName, row.LastName);
    });

    // close connection only when we're certain application is finished
    poolConnection.close();
  } catch (err: any) {
    console.error(err.message);
  }
}

app.listen(3000, () => {
  console.log('Application listening at http://localhost:3000');
});
