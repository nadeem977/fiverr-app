const createError = require("../utils/createError");
const review = require("../models/review.model");
const Gig = require("../models/gig.model");



const CreateReviews = async (req, res, next) => {
  try {
    const existingReview = await review.findOne({ gigId: req.body.gigId });

    if (!existingReview) {
      const createReview = new review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
      });

      await Gig.findByIdAndUpdate(req.body.gigId, {
        $inc: { totalStars: req.body.star, startNumber: 1 },
      });

      const savedReview = await createReview.save();
      res.status(200).send(savedReview);
    } else {
      next(createError(403, "You have already reviewed this gig."));
    }
  } catch (error) {
    next(error);
  }
};


const getReviews = async (req, res, next) => {
  try {
    const reviews = await review.find({ gigId: req.params.gigId });
    if (!reviews) {
      return res.status(404).send("Review not found");
    }
    res.status(200).send(reviews);
    console.log(reviews)
  } catch (error) {
    next(error);
  }
};

const DeleteReview = async (req, res, next) => {
  try {
    const getreviews = await review.findOne({ gigId: req.params.id });
    if (!getreviews) {
      return next(createError(403, "You can delete only your reviews"));
    }
    if (getreviews) {
      await review.findByIdAndDelete(getreviews);
    }
    res.status(200).send("Review deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateReviews, getReviews, DeleteReview };
