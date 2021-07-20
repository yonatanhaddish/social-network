const router= require('express').Router();
const { addThought, addReaction, removeThought, removeReaction, getAllThought, getThoughtById, updateThought }= require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought);

router
    .route('/:id')
    .post(addThought);

router
    .route('/:thoughtId')
    .delete(removeThought)
    .put(updateThought)
    .get(getThoughtById);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports= router;
