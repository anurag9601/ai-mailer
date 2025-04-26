"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = productRoute;
const crypto_1 = require("./crypto");
function productRoute(req, res, next) {
    try {
        const { _Auth } = req.cookies;
        if (!_Auth) {
            res.status(401).json({ error: "User is authorized." });
            return;
        }
        const userAllData = (0, crypto_1.decrypt)(_Auth);
        const userRealJSONData = JSON.parse(userAllData);
        res.user = userRealJSONData;
    }
    catch (error) {
        console.log(`Error in protect route function ${error}`);
        res.status(401).json({ error: "Something went wrong." });
    }
    finally {
        next();
    }
}
