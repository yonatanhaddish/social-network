const { User }= require('../models');

const userController= {
    getAllUser(req, res) {
        User.find( {} )
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            // .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                selet: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createUser( {body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res) {
        User.findByIdAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports= userController;