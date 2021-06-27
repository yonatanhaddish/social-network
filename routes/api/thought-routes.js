const router= require('express').Router();
const { addThought, addReaction, removeThought, removeReaction, getAllThought, getThoughtById }= require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought);

router
    .route('/:userId')
    .get(getThoughtById)
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);


router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports= router;
