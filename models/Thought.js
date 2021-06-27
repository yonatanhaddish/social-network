const { Schema, model, Types}= require('mongoose');

const ReactionSchema= new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'You need to provide a reaction!'
    },
    username: {
        type: String,
        required: 'You need to provide a username!'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    toJSON: {
        getters: true
    }
}
);

const ThoughtSchema= new Schema({
    thoughtText: {
        type: String,
        required: 'You need to provide a thought!'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: 'You need to provide a username!'
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought= model('Thought', ThoughtSchema);

module.exports= Thought;