const router= require('express').Router();
const { addThought, addReaction, removeThought, removeReaction, getAllThought, getThoughtById, updateThought }= require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought)
    .post(addThought);

router
    .route('/:id')
    .get(getThoughtById)
    .delete(removeThought)
    // .put(updateThought);

router
    .route('/:thoughtId')
    .post(addReaction);

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports= router;
