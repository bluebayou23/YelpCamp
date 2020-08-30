const Campground = require("../models/campground");
const Comment = require("../models/comment");
// all middleware goes here
const middlewareObj = {};

middlewareObj.checkOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground) => {
            if(err) {
                res.redirect("back")
            } else {
                // does that user own campground?
                // .equals() is a Mongoose method
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    // if not, redirect
                    res.redirect("back");
                }
            };
        })
    } else {
        // if not, redirect
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err) {
                res.redirect("back")
            } else {
                // does that user own comment?
                // .equals() is a Mongoose method
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    // if not, redirect
                    res.redirect("back");
                }
            };
        })
    } else {
        // if not, redirect
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj