const mongoose = require("mongoose");

const convarsationSchema = new mongoose.Schema(
  {

    id:{
        type:String,
        required:true,
        unique:true,
    },
    sallerID:{
        type:String,
        required:true,
       
    },
    buyerID:{
        type:String,
        required:true,
      
    },
    readBuyseller:{
        type:Boolean,
        required:true,
    },
    readBuyBuyer:{
        type:Boolean,
        required:true,
    },
    lasetSMS:{
        type:String,
        required:false,
    },

  },
  { timestamps: true }
);

export default mongoose.model("convarsation", convarsationSchema);
