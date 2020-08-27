const express = require("express");
const app = express();
const apiPort = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("landing"));

const campgrounds = [
    {name: "Salmon Creek", image: "https://api.creativecommons.engineering/v1/thumbs/e580968b-62c7-480f-b59c-5a1df53998a2"},
    {name: "Granite Hill", image: "https://api.creativecommons.engineering/v1/thumbs/1d0aea14-a58d-4b33-b864-dcf7388971bc"},
    {name: "Clifty Creek", image: "https://api.creativecommons.engineering/v1/thumbs/eecaec78-8811-4bd0-9ded-934aeaea9066"}
]


app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    let newName = req.body.name;
    let newImg = req.body.image;
    let newCampground = {name: newName, image: newImg};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

app.listen(apiPort, () => console.log(`YCServer is running on port ${apiPort}`));
