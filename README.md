# Web App Coding Challenge Chat

The task is to refactor this web application with Pusher and angular (Please ignore app.js and focus your efforts on the content of the "public" folder). Use bootstrap or any other libraries wherever you see fit.

## Real Time with Pusher

The backend of this implementation publishes new chat messages with Pusher(https://pusher.com/) on the channel 'chat-messages' with the event 'new_message'. Use the key "be0cb4958ed00f849ac9" to establish a connection to our Pusher server.

## Directory structure used - https://scotch.io/tutorials/angularjs-best-practices-directory-structure
app/
----- shared/   // acts as reusable components or partials of our site
---------- sidebar/
--------------- sidebarDirective.js
--------------- sidebarView.html
---------- article/
--------------- articleDirective.js
--------------- articleView.html
----- components/   // each component is treated as a mini Angular app
---------- home/
--------------- homeController.js
--------------- homeService.js
--------------- homeView.html
---------- blog/
--------------- blogController.js
--------------- blogService.js
--------------- blogView.html
----- app.module.js
----- app.routes.js
assets/
----- img/      // Images and icons for your app
----- css/      // All styles and style related files (SCSS or LESS files)
----- js/       // JavaScript files written for your app that are not for angular
----- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
index.html