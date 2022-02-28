const { User, Thought } = require('../models');


module.exports = {
    // Get all thought
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
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
          .catch((err) => res.status(500).json(err));
      },

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
          .catch((err) => res.status(500).json(err));
      },
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
          .catch((err) => res.status(500).json(err));
        },

};