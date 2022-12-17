const {Fiction} = require('../models/fiction.model');

class FictionRepository {
    async getFictions(){
        const fictions = await Fiction.find();
        return fictions;
    }
}

module.exports = new FictionRepository();