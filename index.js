const express = require('express');
const fs = require('node:fs');
const { send } = require('node:process');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload')
const path = require('node:path')
const {checkIfWordExits, getTranslations, addTranslation} = require('./sql/procedures.js')
const bodyParser = require('body-parser')

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const server = express();

// server.use('/upload', fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }))
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Dodaj plik na serwer   
server.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        })

        return res.json({ status: 'success', message: Object.keys(files).toString() })
    }
)


// Dodaj słowo do bazy danych
server.post('word/:wordname', async (req, res) => {
    const {wordname} = req.params;
    const isPresent = await checkIfWordExits(wordname);
    let translations = ''
    if (! isPresent) {
        translations = getTranslationsFromDictionary();
    }
    await addTranslationsToDatabase(translations);
})

// Dodaj tłumacznie do słowa
server.post('/translation/', async (req, res) => {
     const {wordName, translation} = req.body.list[0]
     await addTranslation(wordName, translation)
     res.json("Dodano tłumaczenie")
})

// Pobierz tłumaczenie dla danego słowa
server.get('/translation/:wordName', async (req, res) => {
    let translations = await getTranslations(req.params.wordName);
    // if (! translations) {
    //     translations = await getTranslationsFromDictionary(wordName);
    // }
    // if (translations) {
    //     await addTranslationsToDatabase(translations) 
    // }
    res.json(translations)
    // Zrobić z tego JSON (w notatkach zapisać jego format)
    // i wysłać na front
})

// sprawdź czy słowo jest w bazie
server.get('/word/:wordname', async (req, res) => {
    const word = req.params.wordname;
    const isWord = await checkIfWordExits(word)
    res.json(isWord)
})

server.use((error, req, res, next) => {
    res.send('<h1>&#12951 Some weird error happend &#12951</h1><p>' + error + '</p>')
})

server.listen(3001, '127.0.0.1')