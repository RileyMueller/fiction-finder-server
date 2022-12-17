const { Embedding } = require("../models/embedding.model");
const fs = require("fs");
const { parse } = require("csv-parse/sync");
const { Fiction } = require("../models/fiction.model");
const pathJoin = require("path").join;
const embeddings_file = pathJoin(__dirname, "../data/embeddings.csv");

const csvFile = fs.readFileSync(embeddings_file, "utf8");
const rows = parse(csvFile, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ";;",
});
const fictions = [];
const embeddings = [];
for (let row of rows) {
    if (row["embedding"].substring(0, 5) === "[0.0,") {
        continue;
    }

    fictions.push({
        title: row["title"],
        author: row["author"],
        url: row["url"],
    });

    embeddings.push({
        embedding_name:
            "random 8 sections as of 12/15/2022 totalling ~4750 tokens",
        embedding_version: 1,
        n_sample_tokens: Number(row["n_tokens"]),
        embedding: row["embedding"],
    });
}


function setFictionId(err, doc){
    if (err){}
    
    n++;
}

async function seedDatabase() {
    if (fictions.length != embeddings.length) {
        console.error("FICTION AND EMBEDDINGS ARRAYS ARE NOT THE SAME LENGTH");
    }
    const fic_promises = [];
    var n = 0
    fictions.forEach((fic) => {
        const Fic = new Fiction(fic);
        const promise = new Promise((res, rej)=> {
            try{
                Fic.save((err,doc)=>{
                    embeddings[n]['fiction_id'] = doc._id.toString();
                    n++;
                    res();
                });                
            }catch(err){
                rej(err);
            }
        });
        fic_promises.push(promise);
    });
    await Promise.all(fic_promises);
    const bed_promises = [];
    embeddings.forEach(async (bed) => {
        const Bed = new Embedding(bed);
        const promise = Bed.save();
        bed_promises.push(promise);
    });
    await Promise.all(bed_promises);
    // might want to log a done
}

module.exports = { seedDatabase };
