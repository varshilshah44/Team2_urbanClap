const User = require('../models/userModel');

exports.checkAdmin = async (req,res,next)=>{        // This is ran before all other category routes as only admin has access to this rout
    try {        
        const user = await User.findOne({ userToken: req.headers.authorization});
        if(user.userRole !== 'admin') throw new Error('Only Admin can access this page!');
        next();
    } catch (err) {
        res.status(401).json({
            status: 'Unauthorized',
            message: err.message
        });
    }
};

