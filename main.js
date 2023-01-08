// The main.js file of your application
module.exports = function (app) {
    //Render home page
    app.get("/", function (req, res) {
        res.render("home.html")
    });

    //Render about page
    app.get("/about", function (req, res) {
        res.render("about.html")
    })

    //Render add device page
    app.get("/add_device", function (req, res) {
        res.render("add_device.html");
    });

    //add the device into the database
    app.post("/addDevice", function (req, res) {
        //saving data into the database
        let sqlquery = "INSERT INTO devices(type,name,status,volume,channel,temperature,frezzer_temp,refrigerator_temp,fan_speed) VALUES(?,?,?,?,?,?,?,?,?)";
        //excute sql query
        let newrecord = [
        req.body.type,
        req.body.name,
        req.body.status,
        req.body.volume,
        req.body.channel,
        req.body.temperature,
        req.body.frezzer_temp,
        req.body.refrigerator_temp,
        req.body.fan_speed];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else
            res.send("This device is added to database, type: " + req.body.type + " name: " + req.body.name +"return back to home page"+ "/" );
        });
    });


    // Show the available devices
    app.get("/search_device", function (req, res) {
        //  query database  to get all  the  devices  
        let sqlquery = "SELECT * FROM devices";
        //  execute  sql  query   
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            } res.render("search_device.html", { allDevices: result });
        });
    });

    //show the details of the slected device
    app.get("/list_device", function (req, res) {
        //  query database  to get all  the  devices  
        let sqlquery = "SELECT * FROM devices";
        //  execute  sql  query   
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect("/");
            } res.render("list_device.html", { allDevices: result });
        });
    });

    //display the search reasult
    app.get("/search-result-db", function (req, res) {
        //searching in  the  database   
        let word = [req.query.name];
        let sqlquery = "SELECT * FROM `devices` WHERE name like ?";
        //  execute  sql  query   
        db.query(sqlquery, word, (err, result) => {
            if (err) {
                return console.error("No device found  with  the  keyword  you  have  entered"
                    + req.query.name + "error: " + err.message);
            } else {
                //res.send(result);       
                res.render('list_device.html', { allDevices: result });
            }
        });
    });


    //list the available devices for updates
    app.get("/update_device", function (req, res) {
        //  query database  to get all  the  devices  
        let word = [req.query.ID];
        let sqlquery = "SELECT * FROM `devices` WHERE ID like ? ";
        //  execute  sql  query   
        db.query(sqlquery, word, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            //res.send(console.log(result[0].type));
            res.render(

                "update_device.html",
                {
                    allDevices: result,
                    keyword: req.query.ID
                });
        });
    });

    // update new data onto the database
    app.post("/updateDevice", function (req, res) {
        //saving data into the database
        let sqlquery = "UPDATE devices SET type = ?, name = ?, status = ?, volume = ?, channel = ?, temperature =?, frezzer_temp =?, refrigerator_temp = ?, fan_speed=? WHERE ID = ?";
        //excute sql query
        let newrecord = [
            req.body.type,
            req.body.name,
            req.body.status,
            req.body.volume,
            req.body.channel,
            req.body.temperature,
            req.body.frezzer_temp,
            req.body.refrigerator_temp,
            req.body.fan_speed,
            req.body.ID
        ];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else
                res.send("This device is updated, type: " + req.body.type + " ID: " + req.body.ID + "Frezzer Temp: " + req.body.frezzer_temp,);
        });
    });

    // delete the current device
    app.get("/delete_device", function (req, res) {
        //  query database  to get all  the  devices  
        let word = [req.query.ID];
        //DELETE FROM table_name WHERE condition;
        let sqlquery = "DELETE FROM `devices` WHERE ID like ? ";
        //  execute  sql  query   
        db.query(sqlquery, word, (err, result) => {
            if (err) {
                res.redirect("/");
            }
            //res.send(console.log(result[0].type));
            res.render(

                "delete_device.html",
                {
                    allDevices: result,
                    keyword: req.query.ID
                });
        });
    });



    // app.get("/search-result-db", function (req, res) {
    //     //searching in  the  database   
    //     let word = [req.query.keyword];
    //     let sqlquery = "SELECT * FROM `books` WHERE name like ?"; 
    //     //  execute  sql  query   
    //     db.query(sqlquery, word, (err, result) => {
    //         if (err) {
    //             return console.error("No book  found  with  the  keyword  you  have  entered"
    //                 + req.query.keyword + "error: " + err.message);
    //             //res.redirect("./search"); this can also be used in case of an error instead of the above line 
    //         } else {
    //             //step 1:(this will only shows the collected form-data) for debugging purpose only
    //             //res.send(req.query);       
    //             //res.send("This is the keyword you entered: "+ req.query.keyword+ ".<br><br>This is the result of the search:<br>");        
    //             //res.send(result);       
    //             res.render('list.html', { availableBooks: result });
    //         }
    //     });
    // });

}