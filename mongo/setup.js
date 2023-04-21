// const mongoose = require('mongoose');

// const connectionString = 'mongodb://database:27017/link';

// const json = require('../translation_example.json')

// mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => {
//     console.log('everything great')
// }).catch((e) => {
//     console.error('Connection error', e);
// })

// const Schema = mongoose.Schema;
// const TranslationSchema = new Schema({
//     "word": { type: String },
//     "array": {
//         "type": [
//             "Mixed"
//         ]
//     }
// },
//     {
//         timestamps: false,
//     });

// const Translation = mongoose.model('translation', TranslationSchema, 'translations');

// const john = Translation(json);

// john.save();

// module.exports.Translation = Translation;