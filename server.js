const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
const app = express();
const  userRoute = require('./routes/user.routes')
const OrderRoute = require("./routes/order.routes")
const Message = require("./routes/message.routes")
const GigsRoute = require("./routes/gig.routes")
const ReviewRoute = require("./routes/review.routes")
const ConversetionRoute = require("./routes/conversetion.routes")
const authRoute = require('./routes/auth.routes')
const cookieparser = require('cookie-parser')
const JWT = require('jsonwebtoken')


dotenv.config();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use(cookieparser())




const connections = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    console.log("Error", error);
  }
};


app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/Order',OrderRoute)
app.use('/api/Message',Message)
app.use('/api/Reviews',ReviewRoute)
app.use('/api/Gigs',GigsRoute)
app.use('/api/Conversetion',ConversetionRoute)


app.use((err , req,res,next)=>{
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something wont wrong!"
  return res.status(errorStatus).send(errorMessage)
})


app.listen(8000, () => {
  connections();
  console.log("listening on http://localhost:8000");
});
