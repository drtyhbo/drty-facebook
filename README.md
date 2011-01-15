drty-facebook -- Adding Facebook support to drty.
====================================

## DESCRIPTION

drty-facebook implements middleware that makes it very easy to grab data about a user that is Facebook Connected.

## INSTALLATION

Installation is easy:

    $ npm install drty-facebook

## USAGE

In your settings.js file, add:

    var facebook = require('drty-facebook');

to the top of the file.

In the `MIDDLEWARE_CLASSES` section, add `facebook.middleware.FacebookMiddleware` somewhere
in the array after `drty.contrib.sessions.middleware.SessionMiddleware`. For example:

    MIDDLEWARE_CLASSES: [
        drty.contrib.sessions.middleware.SessionMiddleware,
        facebook.middleware.FacebookMiddleware
    ]

And finally, you must also add:

    FB: {
        APP_ID: 'PUT YOUR APP ID HERE'
    }

to your settings hash, so drty-facebook knows your Facebook app id. (To create one, go [here](http://www.facebook.com/developers/createapp.php))

## HOW DOES IT WORK?

The Facebook middleware automatically checks the incoming cookies for Facebook cookies. If it finds them,
it attaches the variable `fb` to the request object that can be used to pull data from Facebook.

## FUNCTION CALLS

`request.fb.me(callback)` - Requests information about the currently logged in user and passes it to the callback function.
The callback takes two parameters, `error` and `data`. If the request is successful, `error` will be null and `data`
will be a hash of information on the current user.

`request.fb.friends(callback)` - Requests information about the currently logged in user's friends and passes it to the callback
function. The callback takes two parameters, `error` and `data`. If the request is successful, `error` will be null and `data`
will be an array of friends of the current user.

## EXAMPLE

Included in the source tree is an example folder that contains a simple example of how to use this library.
To run, go to the example directory and type:

    $ node manage.js runserver

Now open a browser to http://localhost:8080/.