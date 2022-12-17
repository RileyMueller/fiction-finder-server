const fictionRepository = require('../repository/fiction.repository');

class FictionService {
    async getFictions(){
        return await fictionRepository.getFictions();
    }
}

module.exports = new FictionService();