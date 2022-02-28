const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
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

//Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query

// thoughtSchema
// .virtual('reactionCount')
// // Getter
// .get(function () {
//   return `${this.reaction.length}`;
// })






const Thought = model('thought', thoughtSchema);

module.exports = Thought;