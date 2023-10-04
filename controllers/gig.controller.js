const createError = require("../utils/createError");
const Gig = require("../models/gig.model");

const CreateGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "only sellers can create Gig!"));
  }
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savegig = await newGig.save();
    res.status(201).json(savegig);
  } catch (error) {
    next(error);
  }
};

const DeleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId) {
      return next(createError(403, "You can delete only your Gig"));
    }
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig deleted successfully");
  } catch (error) {
    next(error);
  }
};

const SingleGig = async (req, res, next) => {
    try {
      const gig = await Gig.findOne({userId:req.params.id});
      if (!gig) next(createError(404, "Gig not found!"));
      res.status(200).send(gig);
    } catch (err) { 
      next(err);
    }
};


const AllGigs = async (req, res, next) => {
  try {
    const q = req.query;
    const filter = {
      ...(q.cat && { cat: q.cat }),
      ...(q.userId && { userId: q.userId }),
      ...(q.title && { title: q.title }),
      ...((q.min || q.max) && {
         price: {
           ...(q.min && { $gt: q.min }),
           ...(q.max && { $lt: q.max }),
         },
       }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    const gig = await Gig.find(filter).sort({[q.sort]:-1})
    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateGig, DeleteGig, SingleGig, AllGigs };
