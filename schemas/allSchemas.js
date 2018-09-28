module.exports = function(mongoose){
    var Schema = mongoose.Schema;
    
    var postSchema = new Schema({
       userName:        String, 
       title:           String,
       description:     String,
       category:        String,
       dateCreated:     Date
    });

    mongoose.model('post', postSchema, 'posts');
};