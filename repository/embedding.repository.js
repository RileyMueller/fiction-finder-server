const { Embedding } = require("../models/embedding.model");

class EmbeddingRepository {

    async getLatestEmbedding(fictionId){

        const embedding = await Embedding.findOne({
            fiction_id: fictionId
        }, 'embedding', {sort: {version:-1}});

        return embedding.embedding;
    }

    async getLatestEmbeddings() {
        const embeddings = await Embedding.find().sort({version:-1});
        
        // TODO fix so handles versioning later
        const pairs = embeddings.map(embedding => ({
            fiction_id: embedding.fiction_id,
            embedding: embedding.embedding
        }));
        return pairs;
        
        // const embeddings = await Embedding.find().sort({version: -1});
        // const fictionIds = await Embedding.distinct('fiction_id');
        // const fictionEmbeddings = [];
        // const promises = [];
        // for (const id of fictionIds){
        //     promises.push(new Promise((res, rej)=> {
        //         try{
        //             Embedding.findOne({fiction_id:id}).then((doc)=>{
        //                 fictionEmbeddings.push({fiction_id: id, embedding: doc.embedding});
        //                 res()
        //             })           
        //         }catch(err){
        //             rej(err);
        //         }
        //     }));            
        // }

        // await Promise.all(promises);

        // return fictionEmbeddings;
    }
}

module.exports = new EmbeddingRepository();
