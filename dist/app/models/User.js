"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    keycloakId: { type: String, required: true, unique: true },
    username: { type: String },
    email: { type: String },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
