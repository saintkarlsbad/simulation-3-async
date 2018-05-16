require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      Auth0Strategy = require('passport-auth0'),
      passport = require('passport'),
      controller = require('./controller');
      checkForSession = require('./checkForSession');
      robots = require('../server/robots');

const app = express();

const { //destructuring from env file
    SERVER_PORT,
    SESSION_SECRET,
    CALLBACK_URL,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING
    } = process.env

/// ========== TOP LEVEL MIDDLEWARE ========== ///

app.use(bodyParser.json()) /// read JSON from the request body

app.use(session({ // configuration parameter
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session()); // makes it possible for passport to take in info and put it on session // req.session.passport.user

passport.use(new Auth0Strategy({ // info stored auth0 webpage
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    // get names and other relevant data
    // could create user object or create db functions to get profile info
    const db = app.get('db')
    const heloData = profile._json
    let botPic = robots();
    heloData.picture = `https://robohash.org/${botPic}.png`
    
    db.find_user([profile.id]).then( user => {
        if (!user[0]) {
            db.create_user([profile.id, heloData.given_name,
                heloData.family_name, heloData.picture ])
            .then(user => {
                done(null, user[0].id)
            })
        } else {
            done(null, user[0].id) // serializeUser is invoked immediately after this
        }
    })
    console.log(profile, 'profile db info')
}))

passport.serializeUser((id, done) => { // first parameter is whatever gets passed in(profile) from above function --> puts on session
    console.log('serializing user to session')
    done(null, id)
})

passport.deserializeUser((id, done) => {
    // check for existing user from REQ.USER
    // will go to database to get user info
    const db = app.get('db')
    db.find_session_user([id]).then(user => {
        done(null, user[0]); 
    })
})

// ===== Authentication Endpoints ===== //

app.get('/auth/login', passport.authenticate('auth0'))//if someone is not logged in it takes passport.use method ^^

app.get('/auth/callback', passport.authenticate('auth0', { //if they are logged in, will take callback function and go to Dashboard
    successRedirect: 'http://localhost:3000/#/Dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/authenticated', (req, res)=> {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('Nice try, dumbass')
    } // 401 code means not authorized
})


/// ========== CONTROLLER ========== ///
// checkLoggedIn file in controller



// ===== Friend Endpoints ===== //

app.get('/api/friend/list', controller.getFriends);
// Lists all friends of the logged in user. 
//Sends a status of 200 and a list of user IDs that are friends of the logged in user


app.post('/api/friend/add', controller.addFriend)
// Adds a friend to the logged in user's friend list.
// Sends a status of 200 with the updated list of user IDs that are friends of the logged in user.


app.post('/api/friend/remove', controller.removeFriend)
// Removes a friend from the logged in user's friend list
// Sends a status of 200 with the updated list of user IDs that are friends of the logged in user


// ===== User Endpoints === //

app.get('/api/getUser', controller.getUser)

app.put('/api/profile/update', controller.updateUser)
//Updates a user's attribute(s).
//Sends a status of 200 and the updated user object

app.get('/api/profile/list', controller.getProfileList)
// returns a list of 24 users
// This endpoint should count how many users there are, not including the logged in user.
// This endpoint should calculate how many available pages there are for pagination.
//Hint: Total user count. 24 users per page.
// This endpoint should handle the pagination of users.
// Hint: Query offsets and limits.
// Sends a status of 200 with the user count, number of pagination pages, and 24 user objects

// app.get('/api/profile/search', controller.searchProfile)
// Return all users that meet the search criteria.
// Sends a status of 200 and all the users that meet the criteria


// ===== Recommended Endpoints ===== //

app.get('/api/recommended', controller.getRecommended)
// Return a list of user's with the same property ( first name, hobby, etc..).
// Sends a status of 200 and a list of user objects.
// The logged in user shouldn't appear in this list


// Adds friend then updates recommended list.
// When a user gets added, that user should no longer appear in the recommended area until that user is unfriended.
//Sends a status of 200 and an updated list of user objects.
// For example: If recommendations are being shown off of the same first name, 
// the endpoint should re-run the query to find all recommended users with the same first name again.

app.get('/auth/logout', (req, res)=> {
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})

massive(process.env.CONNECTION_STRING).then(db => {
    console.log('--- database connected ---')
    app.set('db', db); // allows app.get('db')
    app.listen(SERVER_PORT, () => { console.log('SERVE IT UP', `Listening on port ${SERVER_PORT}.`); })
})