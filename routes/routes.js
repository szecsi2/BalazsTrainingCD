module.exports = function(express, app, mongoose){
    var router = express.Router();
    
    var postModel = mongoose.model('post');
    
    router.get('/', function(req, res, next){
        res.redirect('/wall');
    });
    
    router.get('/wall', function(req, res, next){
        res.render('wall');
    });

    //This will get a post
    router.get('/api/post', function(req, res, next){
        
        postModel.findOne({'_id':req.query._id}, function(err, post) {
            if(post){
                res.json({
                    post    :   post
                });
            } else {
                res.json('Post does not exist');
            } 
        });

    });

    router.get('/getMyOwnUserName', function(req, res){
        res.json(req.session.myOwnUserName);
    });

    //This will create a post
    router.post('/api/post', function(req, res, next){
        
        var dateCreated = new Date();

        var newPost = new postModel({
            userName:           req.body.userName,
            title:              req.body.title,
            description:        req.body.description,
            category:           req.body.category,
            dateCreated:        dateCreated
        });

        newPost.save(function(err, post){
            console.log('Post has been saved');

            req.session.myOwnUserName = req.body.userName;

            res.json({
                status: 200,
                message: "Post created"
            });
        });
    });
 
    //This will get all the latest Posts for the Wall
    router.get('/api/posts', function(req, res, next){

        postModel.find()
        .exec(function(err, posts) {
            if(err){
                res.send('Post does not exist');
            } else {
                res.json({
                    posts: posts
                });
            }
        });

        });

    app.use('/', router);
};