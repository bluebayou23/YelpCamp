# v6 Changelog

2020.08.29
* added AUTHENTICATION
    - installed passport, passport-local, passport-local-mongoose, express-session
    - Defined User model in models/user.js
    - configured Passport
    - added Register routes and template
    - added Login routes and template
    - added Logout route
    - Prevented users from commenting without being signed in
    - added links to navbar
    - changed display for auth links to show/hide correctly