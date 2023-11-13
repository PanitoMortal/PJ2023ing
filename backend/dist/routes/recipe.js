"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInfo_1 = require("../controllers/userInfo");
const validate_token_1 = __importDefault(require("./validate-token"));
const ViewRecipes_1 = require("../controllers/ViewRecipes");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default /* , getUser */);
router.get('/ViewRecipe', ViewRecipes_1.getViewRecipe);
router.get('/ViewUser', userInfo_1.getUser);
exports.default = router;
