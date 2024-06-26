const db = require("../config/db");

exports.userlist = (req, res) => {
  db.query("SELECT * from users", [], async (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ status: 200, error: null, message: results }));
    }
  });
};

exports.cartlist = (req, res) => {
  db.query("SELECT * from cart", [], async (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ status: 200, error: null, message: results }));
    }
  });
};

exports.wishlist = (req, res) => {
  db.query("SELECT * from wishlist", [], async (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ status: 200, error: null, message: results }));
    }
  });
};

exports.singleuserlist = (req, res) => {
  let user = { id: req.params.id };
  db.query("SELECT * from users where ?", [user], async (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ status: 200, error: null, message: results }));
    }
  });
};

exports.signup = (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    "SELECT username from users where username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.log(err);
      } else if (results.length > 0) {
        res.send(
          JSON.stringify({
            status: 200,
            error: null,
            message: "Username taken",
          })
        );
      } else {
        db.query(
          "SELECT email from users where email = ?",
          [email],
          async (err, results) => {
            if (err) {
              console.log(err);
            } else if (results.length > 0) {
              res.send(
                JSON.stringify({
                  status: 200,
                  error: null,
                  message: "Email already exist",
                })
              );
            } else {
              db.query(
                "INSERT into users set ?",
                [{ username: username, email: email, password: password }],
                async (err, results) => {
                  if (err) console.log(err);
                  else {
                    res.send(
                      JSON.stringify({
                        status: 200,
                        error: null,
                        message: "Sign up successful",
                        results,
                      })
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * from users where username = ? and password = ?",
    [username, password],
    async (err, results) => {
      if (results == "") {
        res.send(
          JSON.stringify({
            status: 200,
            error: null,
            message: "Email or password is incorrect",
          })
        );
      } else {
        res.send(
          JSON.stringify({
            status: 200,
            error: null,
            message: "Login successful",
            results,
          })
        );
      }
    }
  );
};

exports.update = (req, res) => {
  let user = { id: req.params.id };
  let updateData = req.body;
  db.query(
    "UPDATE users set ? where ?",
    [updateData, user],
    async (err, results) => {
      if (err) throw err;
      res.send(
        JSON.stringify({
          status: 200,
          error: null,
          message: "Update successful",
        })
      );
    }
  );
};

exports.storedata = (req, res) => {
  let data = req.body;
  db.query("INSERT INTO cart SET ?", data, async (err, results) => {
    if (err) throw err;
    else {
      res.send(JSON.stringify({ status: 200, error: null, message: 'Data stored' }));
    }
  });
};

exports.storewish = (req, res) => {
  let data = req.body;
  db.query("INSERT INTO wishlist SET ?", data, async (err, results) => {
    if (err) throw err;
    else {
      res.send(JSON.stringify({ status: 200, error: null, message: 'Data stored' }));
    }
  });
};

exports.deleteitem = (req, res) => {
  let itemId = {item_id: req.params.id};
  console.log(itemId)
  db.query("DELETE FROM cart WHERE ?", [itemId], async (err, results) =>{
    if(err) throw err;
    res.send(JSON.stringify({status: 200, error: null, message: 'Deleted'}))
  })
}

exports.deletewishitem = (req, res) => {
  let itemId = {wish_id: req.params.id};
  console.log(itemId)
  db.query("DELETE FROM wishlist WHERE ?", [itemId], async (err, results) =>{
    if(err) throw err;
    res.send(JSON.stringify({status: 200, error: null, message: 'Deleted'}))
  })
}