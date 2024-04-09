require("dotenv").config();
module.exports = {
    port: process.env._PORT || 5000,
    mongouri: process.env._MONGOuRI
}