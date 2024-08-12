const User = require('../Models/User');
var { expressjwt: jwt } = require("express-jwt");

exports.isSignedIn = jwt({
    secret: 'niraj',
    userProperty: "auth",
    algorithms: ["HS256"]
    

});

exports.isAuthenticated = (req, res, next) => {
    if (!req.profile) {
        return res.status(403).json({
            error: "Access Denied"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin Access Denied"
        });
    }
    next();
};