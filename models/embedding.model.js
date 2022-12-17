const mongoose = require("mongoose");
const { Counter } = require("./counter.model");

const EmbeddingSchema = new mongoose.Schema({
    fiction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fiction",
        required: true,
        immutable: true,
    },
    embedding_name: {
        type: String,
        required: true,
    },
    // Auto-generated on save()
    version: {
        type: Number,
        immutable: true,
    },
    n_sample_tokens: {
        type: Number,
        required: true,
        immutable: true,
    },
    embedding: {
        type: String,
        required: true,
        immutable: true,
    },
});

// embeddings get an incremented version number per fiction
EmbeddingSchema.pre("save", async function (next) {
    try {
        // Attempt find counter for the fiction
        let counter = await Counter.findById(this.fiction_id);
        if (!counter) {
            counter = new Counter({ _id: this.fiction_id, count: 0 });
        }

        counter.count++;
        await counter.save();
        this.version = counter.count;
        next();
    } catch (error) {
        next(error);
    }
});

const Embedding = mongoose.model("Embedding", EmbeddingSchema);

module.exports = { Embedding };
