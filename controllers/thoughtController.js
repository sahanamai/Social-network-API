const { User, Thought } = require('../models');


module.exports = {
    // Get all thought
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => {res.status(500).json(err)});
    },
    //`GET` to get a single thought by its `_id`
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => {res.status(500).json(err)});
    },
    //create a new thought`POST` to create a new thought (push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thought: thought._id } },//push the created thought's `_id` to the associated user's `thoughts` array field
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the thought 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      //update thought( `PUT` to update a thought by its `_id`)
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      //delete thought(`DELETE` to remove a thought by its `_id`)
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thought: req.params.thoughtId },
                  { $pull: { thought: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'thought created but no user with this id!',
                })
              : res.json({ message: 'thought successfully deleted!' })
          )
          .catch((err) => {res.status(500).json(err)});
      },
      //`POST` to create a reaction stored in a single thought's `reactions` array field
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reaction: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) =>{res.status(500).json(err)});
      },
      //`DELETE` to pull and remove a reaction by the reaction's `reactionId` value

      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reaction: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => {res.status(500).json(err)});
        },

};