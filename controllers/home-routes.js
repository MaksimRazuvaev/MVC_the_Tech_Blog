// create routs to display all handlebars (GET routs in here)

const router = require('express').Router();
const { Post, Comment } = require('../models'); // add table if needed

// GET all galleries for homepage
router.get('/', async (req, res) => { // main page
  try {
    // to request existed posts in db with comments to them
    const dbAllPosts = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['comment_body'],
        },
      ],
    });

    const posts = dbAllPosts.map((post) =>
      post.get({ plain: true })
    );



    res.render('homepage', { // refers to homepage.handlebars
      posts,

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('dashboard');
});


module.exports = router;
