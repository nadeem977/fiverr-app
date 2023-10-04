const User = require("../models/usermodels");
const createError = require("../utils/createError")



const deleteUsers = async (req, res ,next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");

};




const getUsersDatabase = async (req, res) => {
  try {
    // const data = await User.find({});
    const data = await User.findById(req.params.id);
    if (!data) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { deleteUsers, getUsersDatabase };
