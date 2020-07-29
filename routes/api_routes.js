var db = require("../models")

module.exports = function(app) {
    //Server routes go here
}

module.exports = function(app) {
    app.get("/api/authors", function(req, res) {
      db.Author.findAll({}).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
  
    app.get("/api/authors/:id", function(req, res) {
      db.Author.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
  
    app.post("/api/authors", function(req, res) {
      db.Author.create(req.body).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
  
    app.delete("/api/authors/:id", function(req, res) {
      db.Author.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });

    
       //Get route for the income
       app.get("/api/income", function(req, res) {
        db.Income.findAll({}).then(function(data){
          res.json(data);
        });
      });

      //Post route for the income
      app.post("/api/income", function(req, res) {
        db.Income.create(req.body);
        res.json(req.body);
      });

      //Delete route for the income
      app.delete("/api/income/:id", function(req, res) {
        db.Income.destroy({
          where: {
            id: req.params.id
          }
        })
      });

      //Update route for the income
      app.put("/api/income/:id", function(req, res) {
        db.Income.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(data) {
            res.json(data);
          });
      });


    //Get route for the necessary expense
    app.get("/api/necessary-expense", function(req, res) {
        db.NecessaryExpense.findAll({}).then(function(data){
          res.json(data);
        });
      });

      //Post route for the necessary expense
      app.post("/api/necessary-expense", function(req, res) {
        db.NecessaryExpense.create(req.body);
        res.json(req.body);
      });

      //Delete route for the necessary expense
      app.delete("/api/necessary-expense/:id", function(req, res) {
        db.NecessaryExpense.destroy({
          where: {
            id: req.params.id
          }
        })
      });

      //Update route for the necessary expense
      app.put("/api/necessary-expense/:id", function(req, res) {
        db.NecessaryExpense.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(data) {
            res.json(data);
          });
      });


    //Get route for the unnecessary expense
    app.get("/api/unnecessary-expense", function(req, res) {
        db.UnecessaryExpense.findAll({}).then(function(data){
          res.json(data);
        });
      });

      //Post route for the unnecessary expense
      app.post("/api/unnecessary-expense", function(req, res) {
        db.UnecessaryExpense.create(req.body);
        res.json(req.body);
      });

      //Delete route for the unnecessary expense
      app.delete("/api/unnecessary-expense/:id", function(req, res) {
        db.UnecessaryExpense.destroy({
          where: {
            id: req.params.id
          }
        })
      });

      //Update route for the unnecessary expense
      app.put("/api/unnecessary-expense/:id", function(req, res) {
        db.UnecessaryExpense.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(data) {
            res.json(data);
          });
      });

      
    //Get route for the user
    app.get("/api/user", function(req, res) {
        db.User.findAll({}).then(function(data){
          res.json(data);
        });
      });

      //Post route for the user
      app.post("/api/user", function(req, res) {
        db.User.create(req.body);
        res.json(req.body);
      });

      //Delete route for the user
      app.delete("/api/user/:id", function(req, res) {
        db.User.destroy({
          where: {
            id: req.params.id
          }
        })
      });

      //Update route for the user
      app.put("/api/user/:id", function(req, res) {
        db.User.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(data) {
            res.json(data);
          });
      });

    //Get route for the daily budget
    app.get("/api/daily-budget", function(req, res) {
        db.DailyBudget.findAll({}).then(function(data){
          res.json(data);
        });
      });

      //Post route for the daily budget
      app.post("/api/daily-budget", function(req, res) {
        db.DailyBudget.create(req.body);
        res.json(req.body);
      });

      //Delete route for the daily budget
      app.delete("/api/daily-budget/:id", function(req, res) {
        db.DailyBudget.destroy({
          where: {
            id: req.params.id
          }
        })
      });

      //Update route for the daily budget
      app.put("/api/daily-budget/:id", function(req, res) {
        db.DailyBudget.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(function(data) {
            res.json(data);
          });
      });

  
  };
  
