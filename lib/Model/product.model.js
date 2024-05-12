//defing the model for the product
import mongoose  from "mongoose";
import * as cheerio from 'cheerio'
const { Timestamp } = require("mongodb");


const productSchema   = new mongoose.Schema({

    url:{type:String , required: true ,unique: true },
    image : {type:String , required: true  },
    title: {type:String , required: true  },
    currency : {type:String , required: true  },
    currentPrice : {type:Number , required: true  },
    originalPrice : {type:Number , required: true  },
    priceHistory : [{
        price : {type:Number , required: true  },
        date : {type: Number, default : Date.now}
    }],
    highestPrice: {type:Number , required: true  },
    lowestPrice: {type:Number},
    avgPrice: {type:Number},
    discountRate: {type:Number},
    IsOutofStock: {type: Boolean, default:false},
    catogery: {type:String},
    discription:{type: String, required: true},
    user : [{
            email: {type: String,required: true},

    }], default: [],


},{Timestamp:true})

// defing th model
 const Product = mongoose.model.Product  || mongoose.model('Product' , productSchema);
 export default Product;
 