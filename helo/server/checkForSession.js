module.exports = function (req, res, next) {
    if(!req.session.user) {
        req.session.user = {id: ''}
    }
    console.log(req.session.user, 'checking for session')
    next()
}