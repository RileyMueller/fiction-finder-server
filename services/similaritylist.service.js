const similaritylistRepository = require('../repository/similaritylist.repository');

class SimilarityListService {
    async createSimilarityList(fiction_id){
        return await similaritylistRepository.createSimilarityList(fiction_id);
    }
}

module.exports = new SimilarityListService();