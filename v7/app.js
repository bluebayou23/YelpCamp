const comment = require("./models/comment");
const { _infoTransformers } = require("passport/lib");

const express   = require("express"),
    app         = express(),
    apiPort     = 3000,
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment")
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
;

// requiring routes
const commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
;

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "FourScoreandSeverYearsAgo",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MUST go after passport init & session code
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(apiPort, () => console.log(`YCServer is running on port ${apiPort}`));
