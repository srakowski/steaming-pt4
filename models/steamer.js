var mongoose = require('mongoose');

var SteamerSchema = new mongoose.Schema({    
    author: { type: String, required: true },
    title: { type: String, required: true },
    permalinkKey: { type: String, required: true },    
    dateCreated: { type: Date, default: Date.now },            
    content: { type: String, required: true }                
});

module.exports = mongoose.model("Steamer", SteamerSchema);