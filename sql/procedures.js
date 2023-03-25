
const sql = require('mssql');

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


setTimeout(() => {
  sql.connect(sqlConfig).then(async () => {
    const x = await sql.query`SELECT 9`;
    console.log((await x).recordset)
  })
}, 10000)


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
    //const exists = await checkIfWordExits(wordName);
    //if (exists.match(/Word.*/)) {
    const response = await sql.query`usp_add_translation ${wordName}, ${translation}`;
    return `Translation ${translation} added for ${wordName}`
    //}
    //return `Word ${wordName} added for user ${userId}`
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

// setTimeout(async ()=> {
//   const translations = await getTranslations('book');
//   console.log(translations)
// }, 500)

module.exports = {
  checkIfWordExits,
  getTranslations,
  addTranslation
}

