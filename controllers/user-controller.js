const { User }= require('../models');

const userController= {
    // getting all users
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
    // getting a specific user by an Id
    getUserById({params}, res) {
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                selet: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
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
    // creating a new user
    createUser( {body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // updating a specific existing user by an Id
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
    // deleting a specific user by an Id
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
    },
    // adding a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: { friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        ).
        then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports= userController;