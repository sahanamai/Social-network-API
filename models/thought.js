const { Schema, model } = require('mongoose');

const thoughtSchema = new schema(
    {
 thoughtText :{
     type:String,
     required: true,
     maxlength: 50,
      minlength: 4,
 },
 createdAt:{
     type: Date ,
     default: Date.now,

 },
 username:{
     type: String,
     required: true,
 },
 
reaction : [reactionSchema]
 },
 {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);










const Thought = model('thought', thoughtSchema);

module.exports = Thought;