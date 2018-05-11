
module.exports = {
    getFriends: (req, res, next) => {
        const db = req.app.get('db');

        db.get_friends_list([req.user.id]).then(friends => {
            console.log('get friends', friends)
            res.status(200).send(friends)
        }).catch(err => console.log('didnt get friends', err))
    }, 

    addFriend: (req, res, next) => {
        const db = req.app.get('db')
        const {val} = req.body

        db.add_friend([req.user.id, val]).then(friends => {
            console.log('friend added', friends);
            res.status(200).send(friends)
        }).catch(err => console.log('add-friend error', err))
    },

    removeFriend: (req, res, next) => {
        const db = req.app.get('db')
        const {val} = req.body

        db.remove_friend([req.user.id, val]).then(friends => {
            res.status(200).send(friends)
        })
    },

    getUser: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user([req.user.id]).then(userInfo => {
            res.status(200).send(userInfo)
        })
    },

    updateUser: (req, res, next) => {
        const db = req.app.get('db')
        const {firstName, lastName, profileGender, hairColor, eyeColor, profileHobby, bDate, bMonth, bYear} = req.body

        db.update_user([req.user.id, firstName, lastName, profileGender, hairColor, eyeColor, profileHobby, bDate, bMonth, bYear])
        .then(user => res.status(200).send(user))
        .catch(err => console.log('update failed', err))
    },

    getFriendsList: (req, res, next) => {
        const db = req.app.get('db')
        const {value, limit} = req.query;

        db.get_all_limit(req.user.id, value, limit).then(users => {
            console.log('get all the profiles!', users)
            res.status(200).send(users)
        })
    },

    userCount: (req, res, next) => {
        const db = req.app.get('db');

        db.user_count(req.user.id).then(pages => {
            res.status(200).send(pages)
        }).catch(err => console.log('count error', err))
    },

    getRecommended: (req, res, next) => {
        const db = req.app.get('db')
        
        db.get_recommended(req.user.id).then(users => {
            console.log(users, 'recommended users')
            res.status(200).send(users)
        })
    }

}