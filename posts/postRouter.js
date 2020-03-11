const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts
  .get()
  .then(data => res.json(data))
  .catch(err => res.status(404).json({ message: "could not find all posts", err }));
});

router.get('/:id', (req, res) => {
  // do your magic!
  router.get('/:id', validatePostId(), (req, res) => {
    posts.getById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({message: 'could not find posts with this ID', err}))
    });
  
  
});

router.delete('/:id', (req, res) => {
  // do your magic!
  router.delete('/:id', validatePostId(), (req, res) => {
    posts.remove(req.params.id)
    .then(post => {
      res.status(200).json({message:`post has been deleted`})
    })
    .catch(err => res.status(404).json({errorMessage: `cannot delete post`, err}))
  });
});

router.put('/:id', (req, res) => {
  // do your magic!
  router.put('/:id', validatePostId(), (req, res) => {
    posts
      .update(req.params.id, req.text)
      .then(data => res.json(data))
      .catch(err => res.status(404).json({ message: "could not update post", err }));
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  posts.getById(req.params.id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({message: `post ID not found `})
      }
    })
}

module.exports = router;
