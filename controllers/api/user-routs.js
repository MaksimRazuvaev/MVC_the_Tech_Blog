// CRUD routs to DB
// create HTML routs to display HTML layouts

const router = require('express').Router();
const { Usercred, Comment, Post } = require('../../models');


// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Usercred.create({
        usercred_name: req.body.username,
        usercred_email: req.body.email,
        usercred_password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await Usercred.findOne({
        where: {
            usercred_email: req.body.email,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);   //??? is checkPassword build in funcrtion???
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect password. Please try again!' });
        return;
      }
console.log(dbUserData);
  
      // Once the user successfully logs in, set up the sessions variable 'loggedIn'
      req.session.save(() => {
        req.session.loggedIn = true;   // loggedIn varaible is set to browser to mark session as loged in
        req.session.userId = dbUserData.id;
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  // comment
router.post('/post/:id', async (req, res) => {
  try { 
console.log(req.session.userId);
    const dbCommentData = await Comment.create({
      comment_body: req.body.comment,
      post_id: req.params.id,
      user_id: req.session.userId,
  });

      res
        .status(200)
        .json({ comment: dbCommentData, message: 'Your comment is saved!' });
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

 // new post
 router.post('/dashboard/newpost', async (req, res) => {
  try { 
console.log(req.session.userId);
    const dbPostData = await Post.create({
      post_header: req.body.title,
      post_body: req.body.content,
      user_id: req.session.userId,
  });

      res
        .status(200)
        .json({ comment: dbPostData, message: 'Your post is saved!' });
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


  module.exports = router;
