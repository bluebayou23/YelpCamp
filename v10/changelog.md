# v10 Changelog

2020.08.29
* added Update/Edit and Destroy for campgrounds
    - Edit
        - Added method-override
        - Added Edit link route for campgrounds
        - Added link to Edit page
        - Added Update Route
        - Fixed $set problem
    - Delete
        - Added Destroy route
        - Added Delete button
    - Authorization
        - Users can now only edit/delete campgrounds that user created
        - Fixed edit and delete buttons to hide/show properly

2020.08.30
* added Update/Edit and Destroy for comments
    - Edit
        - added edit route for comments
        - added edit button
        - added update route
    - Delete
        - added Destroy route
        - added Delete button
    - Authorization
        - Users can now only edit/delete comments that user created
        - Fixed edit and delete buttons to hide/show properly