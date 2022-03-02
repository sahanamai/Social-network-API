const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
      
      },
      email:{
        type: String,
        unique: true,
        required: true,
        //valid emaid address(look mongoose matching validation)

      },
      thought:[
//Array of `_id` values referencing the `Thought` model
   {
    type: Schema.Types.ObjectId,
    ref: 'Thought', 
   },
      ],
    
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',   
        },
    ],
//Array of `_id` values referencing the `User` model (self-reference)

},

    {
      // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
      // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  // Create a virtual property `friendCount` that return lenght of the users friends array field on query
  userSchema
    .virtual('friendCount')
    .get(function () {
      return this.friends.length;
    })
    
  // Initialize  User model
 
const User = model('user', userSchema);

module.exports = User;