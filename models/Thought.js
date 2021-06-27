const { Schema, model, Types}= require('mongoose');
const dateFormat= require('../utils/dateFormat');

const ReactionSchema= new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: 'You need to provide a reaction!',
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: 'You need to provide a username!'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

const ThoughtSchema= new Schema({
    thoughtText: {
        type: String,
        required: 'You need to provide a thought!',
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => dateFormat(createdAt)
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