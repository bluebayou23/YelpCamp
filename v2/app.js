const express   = require("express"),
    app         = express(),
    apiPort     = 3000,
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing"));

// Schema setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://api.creativecommons.engineering/v1/thumbs/1d0aea14-a58d-4b33-b864-dcf7388971bc",
//         description: "This is a huge granite hill with no bathrooms."
//     }, (err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEW CAMPGROUND:");
//             console.log(campground);
//         }
//     }
// );

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
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    })

})

app.listen(apiPort, () => console.log(`YCServer is running on port ${apiPort}`));
