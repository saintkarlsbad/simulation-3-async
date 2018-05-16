
module.exports = {
    getFriends: (req, res, next) => {
        const db = req.app.get('db');

        db.get_friends_list([req.user.id]).then(friends => {
            res.status(200).send(friends)
        }).catch(err => console.log('didnt get friends', err))
    },

    addFriend: (req, res, next) => {
        const db = req.app.get('db');
        const { friendId } = req.body;

        db.add_friend(req.user.id, friendId).then(users => {
            console.log('friend added');
            res.status(200).send(users)
        }).catch(err => console.log('add-friend error', err))
    },

    removeFriend: (req, res, next) => {
        const db = req.app.get('db');
        const { friendId } = req.body;

        db.remove_friend([req.user.id, friendId]).then(users => {
            res.status(200).send(users)
        })
    },

    getUser: (req, res, next) => {
        const db = req.app.get('db')
        db.get_user([req.user.id]).then(user => {
            res.status(200).send(user)
        })
    },

    updateUser: (req, res, next) => {
        const db = req.app.get('db')
        const { firstName, lastName, profileGender, hairColor, eyeColor, profileHobby, bDate, bMonth, bYear } = req.body

        db.update_user([req.user.id, firstName, lastName, profileGender, hairColor, eyeColor, profileHobby, bDate, bMonth, bYear])
            .then(user => res.status(200).send(user))
            .catch(err => console.log('update failed', err))
    },

    getProfileList: (req, res, next) => {
        const db = req.app.get('db')

        db.get_Profiles([req.user.id]).then(users => {
            console.log('get all the profiles!', users)
            res.status(200).send(users)
        })
    },

    getRecommended: (req, res, next) => {
        const db = req.app.get('db')

        if (req.user) {
            db.get_recommended([req.user.id]).then(users => {
                console.log(users, 'recommended users')
                res.status(200).send(users)
            })
        }

    }

}