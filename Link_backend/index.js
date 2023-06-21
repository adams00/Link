const express = require('express');
const fileUpload = require('express-fileupload')
const path = require('path')
const bodyParser = require('body-parser');
const scrape = require('./diki_sucker.js')
const fs = require('fs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const { addTestDocument, getTestDocument, getTranslationFromDatabase, addTranslationToDatabase, uri } = require('./mongo/setup.js')

const filesPayloadExists = require('./middleware/filesPayloadExists');
const fileExtLimiter = require('./middleware/fileExtLimiter');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');

const listenIP = process.env.LISTEN_IP || '127.0.0.1'
// '127.0.0.1'

const server = express();

server.use(bodyParser.json());
server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['http://localhost:3000']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true')
    next();
});


server.use(session({
    secret: 'foo',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: uri, touchAfter: 24 * 3600 }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}));

// Dodaj plik na serwer    
server.post('/upload',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'files', files[key].name);
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
    let { wordName } = req.params;
    console.log(`Trying to get ${wordName} form database`)
    // removing comma and dot from the end of string; lowerCase
    wordName = wordName.replace(/[.,]/g, "").toLowerCase();
    let translation = {};
    translation = await getTranslationFromDatabase(wordName);
    if (Object.is(translation, null)) {
        translation = await scrape(wordName);
        if (!translation.error) {
            console.log('translation add')
            addTranslationToDatabase(translation)
        }

    }

    //const rawTranslations = Translation.find({ word: 'heart' })
    // const translations = (({ word, array }) => {
    //     return { word, array }
    // })(rawTranslations)
    //console.log(rawTranslations)
    res.json(translation)
})

// sprawdź czy słowo jest w bazie
server.get('/word/:wordname', async (req, res) => {
    const word = req.params.wordname;
    const isWord = await checkIfWordExits(word)
    res.json(isWord)
})

server.get('/test/document', async (req, res) => {
    const document = await getTestDocument();
    res.json(document)
})

server.post('/test/document', async (req, res) => {
    await addTestDocument({ lubie: 'Placki' });
    res.json({ message: 'document added' })
})

server.use((error, req, res, next) => {
    res.send('<h1>&#12951 Some weird error happend &#12951</h1><p>' + error + '</p>')
})

server.listen(3001, listenIP)