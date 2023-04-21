const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('node:path')
const bodyParser = require('body-parser');
const scrape = require('./diki_sucker.js')
const fs = require('node:fs')

//const Translation = require('./mongo/setup.js').Translation

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
    const { wordname } = req.params;
    const isPresent = await checkIfWordExits(wordname);
    let translations = ''
    // if (!isPresent) {
    //     translations = getTranslationsFromDictionary();
    // }
    await addTranslationsToDatabase(translations);
})

// Dodaj tłumacznie do słowa
server.post('/translation/', async (req, res) => {
    const { wordName, translation } = req.body.list[0]
    await addTranslation(wordName, translation)
    res.json("Dodano tłumaczenie")
})

// Pobierz tłumaczenie dla danego słowa
server.get('/translation/:wordName', async (req, res) => {
    const translations = await scrape([req.params.wordName]);
    //const rawTranslations = Translation.find({ word: 'heart' })
    // const translations = (({ word, array }) => {
    //     return { word, array }
    // })(rawTranslations)
    //console.log(rawTranslations)
    res.json(translations)
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

server.listen(3001, '0.0.0.0')