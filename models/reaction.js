const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
reactionId:{
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
},

reactionBody: {
    type: String,
    required: true,
    maxlength: 25,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username:{
    type: String,  
    required: true,
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);



    

 

module.exports = reactionSchema;

//This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.