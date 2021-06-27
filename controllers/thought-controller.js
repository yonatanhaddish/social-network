const { User, Thought }= require('../models');

const thoughtController= {
    addThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: { thoughts: _id }},
                    { new: true, runValidators: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {replies: body}},
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    removeThought({params}, res) {
        Thought.findByIdAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'No thought found with this id!'});
                }
                return User.findByIdAndUpdate(
                    { _id: params.userId},
                    { $pull: { thoughts: params.thoughtId}},
                    { new: true, runValidators: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    removeReaction({params}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true, runValidators: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};


module.exports= thoughtController;

