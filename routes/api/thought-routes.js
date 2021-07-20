const router= require('express').Router();
const { addThought, addReaction, removeThought, removeReaction, getAllThought, getThoughtById, updateThought }= require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought);

router
    .route('/:id')
    .delete(removeThought)
    .put(updateThought)
    .post(addThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .post(addReaction);

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports= router;
