const express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");
;
const middleware = require("../middleware");

// Comments NEW
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

// Comments CREATE
router.post("/", middleware.isLoggedIn, (req, res) => {
    // look up campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to campground  
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to show page of that campground
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})

// comments EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            res.redirect("back");
        } else{ 
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
})

// comments UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// comments DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})

module.exports = router;