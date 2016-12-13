var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var Users     =   require("./models/users");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.route("/users")
    .get(function(req,res){
        var response = {};
        Users.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(data.length > 0){
                    response = data;
                }else{
                    response = {"error" : true,"message" : "Error! data not found"};
                }
            }
            res.json(response);
        })
     })
     .post(function(req,res){
         Users.findOne({username : req.body.username},function(err,data){
            var response = {};
            
            if(!data){
                var db = new Users();
                
                // fetch email and password from REST request.
                // Add strict validation when you use this in Production.
                db.username = req.body.username; 
                db.latitude = "";
                db.longtitude = "";
                
                db.save(function(err,data){
                // save() will run insert() command of MongoDB.
                // it will add new data in collection.
                    if(err) {
                        response = {"error" : true,"message" : "Error adding data"};
                    } else {
                        response = data;
                    }

                    res.json(response);
                });
            }else{
                response = data;
                res.json(response);
            }

            
         });  
        });

    router.route("/users/:id")
        .get(function(req,res){
            var response = {};
            Users.findById(req.params.id,function(err,data){
            // This will run Mongo Query to fetch data based on ID.
                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {"error" : false,"message" : data};
                }
                res.json(response);
            });
        })
        .put(function(req,res){
            var response = {};
            // first find out record exists or not
            // if it does then update the record

            var query = {"_id": req.params.id};
            var update = {username: req.body.username,points : req.body.points, latitude : req.body.latitude, longtitude : req.body.longtitude, user_status : req.body.status };
            
            var options = {new: true};

            Users.findOneAndUpdate(query, update, options, function(err, person) {
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    response = {"error" : false,"message" : "Data updated!"};
                }

                res.json(response);
            });
        });

        router.route("/users/logout/:id")
            .put(function(req,res){
            var response = {};
            // first find out record exists or not
            // if it does then update the record

            var query = {"_id": req.params.id};
            var update = {user_status : 0 };
            
            var options = {new: true};

            Users.findOneAndUpdate(query, update, options, function(err, person) {
                if (err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                }else{
                    response = {"error" : false,"message" : "Logout"};
                }

                res.json(response);
            });
        });

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

app.use('/',router);

app.listen(5000);
console.log("Listening to PORT 3000");