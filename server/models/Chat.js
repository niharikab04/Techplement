const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const chatSchema = new Schema({
    Message: {
        type: String,
      
        },
    author: {
        type: String,
       
    } 
  },
{
    timestamps: true
}
)
const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat;