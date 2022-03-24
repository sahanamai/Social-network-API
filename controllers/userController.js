const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => {res.status(500).json(err)});
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {res.status(200).json(user)})
            .catch((err) => res.status(500).json(err));
    },
    //delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thought } })
            )
            .then(() => res.json({ message: 'User and thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {res.status(500).json(err)});
    },

    // //POST` to add a new friend to a user's friend list
    //Array of `_id` values referencing the `User` model (self-reference)(self reference)
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true,new: true }
        )

            .then((friend) =>
                !friend
                    ? res.status(404).json({
                        message: ' No user found with that ID',
                    })
                    : res.json('Add friend 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },



//DELETE` to remove a friend from a user's friend list
   deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true,new: true }
    )

        .then((friend) =>
            !friend
                ? res.status(404).json({
                    message: ' No user found with that ID',
                })
                : res.json('Delete friend 🎉')
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
   },
};