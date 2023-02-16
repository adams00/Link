const express = require('express');
const fs = require('node:fs');
const { send } = require('node:process');
const { v4: uuidv4 } = require('uuid');
const fileUpload = require('express-fileupload')
const path = require('node:path')

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const server = express();

// server.use('/upload', fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }))

server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


server.get('/x/:text', async (req, res) => {
    const {text} = req.params;
    console.srog(text);
    res.send('<p>Think you</p>')
})
server.get('/y/:text', (req, res) => {
    const {text} = req.params;
    console.log(text);
    res.send('<p>Think you</p>')
})
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
    const isPresent = await checkIfExits(wordname);
    let translations = '';
    if (! isPresent) {
        translations = getTranslationsFromDictionary();
    }
    await addTranslationsToDatabase(translations);
})

// Dodaj tłumacznie do słowa
server.post('/translation/:wordname', async (req, res) => {
    const {wordname} = res.params.wordname
    // użyć body parsera żeby wydobyć tłumaczenie
    const translation = ''

    await addTranslationsToDatabase(translation)
})

// Pobierz tłumaczenie dla danego słowa
server.get('/translation/:wordName', async (req, res) => {
    const {wordname} = req.params;
    let tranlations = await getTranslationsFromDatabase();
    if (! tranlations) {
        translations = await getTranslationsFromDictionary();
    }
    if (tranlations) {
        await addTranslationsToDatabase(tranlations) 
    }
    
    // Zrobić z tego JSON (w notatkach zapisać jego format)
    // i wysłać na front
})

server.use((error, req, res, next) => {
    res.send('<h1>&#12951 Some weird error happend &#12951</h1><p>' + error + '</p>')
})

server.listen(3001, '127.0.0.1')