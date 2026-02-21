const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    userName: {
        type: String,
        require:true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, 
{timestamps: true});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;