const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");
;
// =================================
// ROOT ROUTE
// =================================
router.get("/", (req, res) => res.render("landing"));

// =================================
// AUTH ROUTES
// =================================

// show REGISTER form
router.get("/register", (req, res) => {
    res.render("register");
});

// handle SIGN UP logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=> {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        })
    })
});

// show LOGIN form
router.get("/login", (req, res) => {
    res.render("login");
})
// handling LOGIN logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
});

// LOGOUT route logic
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;