const mongoose = require("mongoose");

const SimilarityListSchema = new mongoose.Schema({
    source_fiction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fiction",
        required: true,
        immutable: true,
    },
    // Auto-generated on save()
    version: {
        type: Number,
        required: true,
        immutable: true,
    },
    // What embedding the source used
    embedding: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Embedding",
        required: true,
        immutable: true,
    },
    items: [
        {
            fiction_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Fiction",
                required: true,
            },
            distance: {
                type: Number,
                required: true,
            },
            // What embedding it used
            embedding: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Embedding",
                required: true,
            },
        },
    ],
    // auto generated
    length: {
        type: Number,
        required: true,
        immutable: true,
    }
});

// similaritylists get an incremented version number per source_fiction
SimilarityList.pre("save", async function (next) {
    try {
        // Attempt find counter for the fiction
        const counter = await Counter.findById(this.source_fiction_id);
        if (!counter) {
            counter = new Counter({ _id: this.source_fiction_id, count: 0 });
        }

        counter.count++;
        await counter.save();
        this.version = counter.count;

        // set length
        this.length = this.items.length;
        next();
    } catch (error) {
        next(error);
    }
});

const SimilarityList = mongoose.model("SimilarityList", SimilarityListSchema);

module.exports = { SimilarityList };
