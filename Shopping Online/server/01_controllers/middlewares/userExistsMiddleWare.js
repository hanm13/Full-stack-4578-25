
    
    const user = require('../../00_models/user');
    
    let userExistsMiddleWare = (req, res, nextStep) => {

        user.UserModel.count({
            "personID": req.body.personID
        }).then(counter => {
            if (counter) {
                res.status(401).send("User is already exists with this ID!");
            } else {

                nextStep();
                
            }

        })
        .catch((e) => {
            res.status(401).send("User is already exists with this ID!");
        });        

    };

    module.exports = { "middleware":userExistsMiddleWare }