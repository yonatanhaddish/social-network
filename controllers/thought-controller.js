const { User, Thought }= require('../models');

const thoughtController= {
    // add thoughts
    addThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    { _id: params.id},
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No user found with tjjjjjjhis id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // add reactions
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No user found with this ikjlkjd!'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // remove thoughts
    removeThought({params}, res) {
        Thought.findByIdAndDelete({_id: params.thoughtId})
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'deleted!'});
                }
                return User.findByIdAndUpdate(
                    { thoughts: params.username},
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
    // remove reactions
    removeReaction({params}, res) {
        Thought.findByIdAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    getAllThought(req, res) {
        Thought.find( {} )
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            // .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.thoughtId})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(404).json(err));
    }
};


module.exports= thoughtController;

