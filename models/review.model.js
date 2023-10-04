const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
  
    gigId:{
        type:String,
        required:true,
    },
    star:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    },
    userId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
  },
  
  { timestamps: true }
);

const review =  mongoose.model("Review", ReviewSchema);

module.exports = review
