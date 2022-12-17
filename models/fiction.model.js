const mongoose = require('mongoose');
const {SimilarityList} = require('./similaritylist.model');


// private helper function
async function joinFictionsWithSimilarityListItems(items) {
    const joinedFictionDocs = await Promise.all(
        items.map(async item => {
            const fictionDoc = await Fiction.findById(item.fiction_id).exec();
            return {
                ...fictionDoc.toObject(),
                distance: item.distance,
            }
        })
    );
    joinedFictionDocs['length'] = items.length;
    return joinedFictionDocs;
}

const FictionSchema = new mongoose.Schema(
    // Attributes
    {
        title: {
            type: String,
            required: true,
            immutable: true,
        },
        author: {
            type: String,
            required: true,
            immutable: true,
        },
        url: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
        },
    },
    {
        methods: {
            /**
             * 
             * @returns Fiction information as well its distance according to the latest SimilarityList for this fiction
             */
            async get_latest_similarities() {
                const latestSimilarities = await SimilarityList.findOne({
                    source_fiction_id: this._id
                }, 'items', {sort: {version: -1} }).exec();

                return joinFictionsWithSimilarityListItems(latestSimilarities.items);
            },            
        }
    }
);


const Fiction = mongoose.model('Fiction', FictionSchema);

module.exports = {Fiction};