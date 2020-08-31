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
    res.render("register", {page: 'register'});
});

// handle SIGN UP logic
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=> {
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/campgrounds");
        })
    })
});

// show LOGIN form
router.get("/login", (req, res) => {
    res.render("login", {page: 'login'});
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
    req.flash("success", "Logged out!")
    res.redirect("/campgrounds");
})

module.exports = router;