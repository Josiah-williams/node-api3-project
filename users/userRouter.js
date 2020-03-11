const express = require("express");
const users = require("./userDb");
const postRouter = require("../posts/postRouter");
const router = express.Router();

const router = express.Router();

// router.post('/', (req, res) => {
  // do your magic!
  router.post("/", validateUser(), (req, res) => {
    users
      .insert(req.body)
      .then(data => res.json(data))
      .catch(err =>
        res
          .status(404)
          .json({ errorMessage: "cannot post user at this time", err })
      );
  });
// router.post('/:id/posts', (req, res) => {
  // do your magic!
  router.post("/:id/posts", validateUserId(), validatePost(), (req, res) => {
    // const newUser = { ...req.body, user_id: req.params.id };
    posts
      .insert(req.text)
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ error: "Post cannot be created" }));


router.get('/', (req, res) => {
  // do your magic!
  users
  .get()
  .then(data => res.json(data))
  .catch(err => res.status(404).json({ message: "could not find users" }));
});


// router.get('/:id', (req, res) => {
  // do your magic!
  router.get("/:id", validateUserId(), (req, res) => {
    users
      .getById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res
          .status(404)
          .json({ message: "could not find users with this ID", err })
      );
  });
});

// router.get('/:id/posts', (req, res) => {
  // do your magic!
// router.get("/posts/:id", validateUserId(), (req, res) => {
//   users
//     .getUserPosts(req.params.id)
//     .then(userposts => {
//       res.status(200).json(userposts);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: "error getting userPosts" });
//     });
// });
// router.delete('/:id', (req, res) => {
  // do your magic!
  router.delete("/:id", validateUserId(), (req, res) => {
    users
      .remove(req.params.id)
      .then(user => {
        res.status(200).json({ message: `user has been deleted` });
      })
      .catch(err => res.status(404).json({ errorMessage: `cannot delete user` }));
  });


// router.put('/:id', (req, res) => {
  // do your magic!
  router.put("/:id", validateUser(), validateUserId(), (req, res) => {
    users
      .update(req.params.id, req.user)
      .then(data => res.json(data))
      .catch(err =>
        res.status(404).json({ errorMessage: `could not update this user `, err })
      );
  });


//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users
      .getById(req.params.id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "id does not exist" });
        }
})
}
function validateUser(req, res, next) {
  // do your magic!
  resource = {
    name: req.body.name
  };
  if (!req.body.name) {
    return res.status(404).json({ message: "missing user data" });
  } else {
    req.user = resource;
    next();
  }
};

function validatePost(req, res, next) {
  // do your magic!
  resource = {
    text: req.body.text,
    user_id: req.params.id
  };

  if (!req.body.text) {
    return res.status(404).json({ message: "missing post data" });
  } else {
    req.text = resource;
    next();
  }
};


module.exports = router;
