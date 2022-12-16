const {Fiction} = require('../models/fiction.model');
const fs = require('fs');
const {parse} = require('csv-parse/sync');
const pathJoin = require('path').join;
const embeddings_file = pathJoin(__dirname,'../data/embeddings.csv');

const csvFile = fs.readFileSync(embeddings_file, 'utf8');
const rows = parse(csvFile, {
    columns: true, 
    skip_empty_lines:true,
    delimiter: ';;'
});
const embeddings = [];
for (let row of rows){
    if (row['embedding'].substring(0,5) === '[0.0,'){
        continue;
    }
        
    const doc = new Fiction({
        title: row['title'],
        author: row['author'],
        url: row['url'],
        embedding_name: 'random 8 sections as of 12/15/2022 totalling ~4750 tokens',
        embedding_version: 1,
        n_sample_tokens: Number(row['n_tokens']),
        embedding: row['embedding']
    });

    embeddings.push(doc)
}

module.exports = async function seedDatabase(){
    const promises = []
    for (let doc of embeddings){
        promises.push(doc.save());
    }
    await Promise.all(promises);
}