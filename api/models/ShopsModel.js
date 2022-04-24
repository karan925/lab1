const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var shopSchema = new Schema({
    shop_name: {type: String, required: true}
},
{
    versionKey: false
});

const shopModel = mongoose.model('shop', shopSchema);
module.exports = shopModel;