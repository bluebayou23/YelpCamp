const express = require("express"),
    router = express.Router();
    Campground = require("../models/campground")

// INDEX route - show all campgrounds
router.get("/", (req, res) => {
    // Get all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            // render that file
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    })
})

// CREATE route - add new campground to db
router.post("/", isLoggedIn, (req, res) => {
    // Get data from form and add to campgrounds array
    let newName = req.body.name;
    let newImg = req.body.image;
    let newDesc = req.body.description;
    let newAuthor = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: newName, image: newImg, description: newDesc, author: newAuthor};
    // create a new campground and save to db
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err);
        } else{
        // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })   
});

// NEW route - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

// SHOW route - shows more info about one campground
router.get("/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;