const express   = require("express"),
    app         = express(),
    apiPort     = 3000,
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", (req, res) => res.render("landing"));

// INDEX route - show all campgrounds
app.get("/campgrounds", (req, res) => {
    // Get all campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            // render that file
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
})

// CREATE route - add new campground to db
app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    let newName = req.body.name;
    let newImg = req.body.image;
    let newDesc = req.body.description;
    let newCampground = {name: newName, image: newImg, description: newDesc};
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
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

// SHOW route - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })
});

app.listen(apiPort, () => console.log(`YCServer is running on port ${apiPort}`));
