const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
  
    gigID:{
        type:String,
        required:true,
    },
    Img:{
        type:String,
        required:false,
      
    },
     title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    sallerID:{
        type:String,
        required:true,
    },
    buyerID:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    payment_intent:{
        type:String,
        required:true,
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
