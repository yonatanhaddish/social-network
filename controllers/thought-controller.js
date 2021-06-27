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
    }
};


module.exports= thoughtController;

