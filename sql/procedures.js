
const sql = require('mssql');
const fs = require('node:fs');
const path = require('path');

const initialize = getFile('./create_database_structure.sql')
const procedures = getFile('./create_stored_procedures.sql')

const sqlConfig = {
  user: 'sa',
  password: 'myVeryStrongPassword99!',
  //database: 'mini_linq',
  server: 'database',
  port: 1433,
  pool: {
    max: 1,
    min: 0,
    idleTimeoutMillis: 2000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

const initializeArray = initialize.split('GO');
const proceduresArray = procedures.split('GO');

function getFile(path) {
  fs.readFileSync(path.resolve(__dirname, path), { encoding: 'utf8' });
}

var doProcedures = function (files) {
  return files.reduce((p, file) => {
    return p.then(() => doProcedure(file));
  }, Promise.resolve()); // initial
};

async function doProcedure(procedure) {
  return new Promise(async (resolve, reject) => {
    sql.connect(sqlConfig).then(async () => {
      const x = await sql.batch(procedure);
      console.log(x.recordset)
      resolve()
    })
  })

}

setTimeout(() => {
  doProcedures([...initializeArray, ...proceduresArray])
}, 20000)


async function checkIfWordExits(wordName) {
  try {
    const exists = await sql.query`usp_check_word ${wordName}`;
    if (exists.recordset[0]['']) return `Word ${wordName} exists in database`;
    return `Cannot find ${wordName} in database`
  } catch (err) {
    console.log(err)
  }
}
async function addWord(userId = 1, wordName) {
  try {
    const exists = await checkIfWordExits(wordName);
    if (exists.match(/Word.*/)) {
      console.log(`Cannot add, word ${wordName} already exists in database`)
      return `Cannot add, word ${wordName} already exists in database`
    }
    const response = await sql.query`usp_add_word ${userId}, ${wordName}`;
    console.log(response.rowsAffected)
    return `Word ${wordName} added for user ${userId}`
  } catch (err) {
    console.log(err)
  }
}

async function addTranslation(wordName, translation) {
  try {
    await sql.query`usp_add_translation ${wordName}, ${translation}`;
    return `Translation ${translation} added for ${wordName}`
  } catch (err) {
    console.log(err)
  }
}

async function getTranslations(wordName) {
  try {
    const response = await sql.query`usp_get_translations ${wordName}`;
    return response.recordset
  } catch (err) {
    console.log(err)
  }
}

async function getExaples(wordName) {
  try {
    const response = await sql.query`usp_get_translations ${wordName}`;
    return response.recordset
  } catch (err) {
    console.log(err)
  }
}


// setTimeout(async ()=> {
//   const translations = await getTranslations('book');
//   console.log(translations)
// }, 500)

module.exports = {
  checkIfWordExits,
  getTranslations,
  addTranslation
}

