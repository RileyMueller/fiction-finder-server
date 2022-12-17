const {SimilarityList} = require('../models/similaritylist.model');
const embeddingRepository = require('./embedding.repository');

class SimilarityListRepository {
    async createSimilarityList(fiction_id){
        // Get the latest embedding for every fiction
        const latest_embeddings = await embeddingRepository.getLatestEmbeddings(fiction_id);

        // Get the latest embedding for source fiction
        const source_embedding = await embeddingRepository.getLatestEmbedding(fiction_id);
        // Perform cosine simulatiry between the source and each 
        // https://www.npmjs.com/package/compute-cosine-similarity

        //Save simlist models
        return {msg: 'success'};
    }
}

module.exports = new SimilarityListRepository();