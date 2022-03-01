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
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
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
            .catch((err) => res.status(500).json(err));
    },

    // //POST` to add a new friend to a user's friend list
    // addUserFriendList(req, res) {
    //     User.create(req.body)
    //         .then((friends) => {
    //             return User.findOneAndUpdate(
    //                 { _id: req.body.userId },
    //                 { $addToSet: { friends: friends._id } },
    //                 { new: true }
    //             );
    //         })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({
    //                     message: 'friendlist created, but found no user with that ID',
    //                 })
    //                 : res.json('Created the friendlist 🎉')
    //         )
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },
};


//DELETE` to remove a friend from a user's friend list