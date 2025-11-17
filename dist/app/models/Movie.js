"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MovieSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    genres: [{ genre: { name: String, } }],
    // 👇 Add a reference to User
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.default = mongoose_1.default.models.Movie || (0, mongoose_1.model)('Movie', MovieSchema);
