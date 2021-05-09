const { MONGODB_URL } = require("./constants");

let mongoose;
let Image;

class Database {
    constructor() {
        if (mongoose === undefined) {
            mongoose = require("mongoose");
            mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

            const { Schema } = mongoose;

            const imageSchema = new Schema({
                name: String,
                filename: String,
                path: String,
                tags: [String],
                private: Boolean,
                timestamp: Date,
            });
            imageSchema.index({
                name: "text",
                tags: "text",
            });

            Image = mongoose.model("Image", imageSchema);
        }
    }

    addImage(name, filename, path, tags, private_, timestamp) {
        const doc = new Image({
            name,
            filename,
            path,
            tags,
            private: private_,
            timestamp
        });

        doc.save();
    }

    async searchImage(query) {
        const results = await Image.find({
            private: false,
            $text: {
                $search: query,
            },
        }).exec();

        return results;
    }
}

module.exports = Database;