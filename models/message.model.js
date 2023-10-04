const mongoose = require("mongoose");

const convarsationSchema = new mongoose.Schema(
  {

    ConversationID:{
        type:String,
        required:true,
    },
    userID:{
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

export default mongoose.model("convarsation", convarsationSchema);
