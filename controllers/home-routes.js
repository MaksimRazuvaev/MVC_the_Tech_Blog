// create routs to display all handlebars (GET routs in here)

const router = require('express').Router();
const { Post, Comment, Usercred } = require('../models'); // add table if needed
const withAuth = require('../utils/auth');


// GET all posts for homepage
router.get('/', async (req, res) => { // main page
  try {
    // to request existed posts in db with comments to them
    const dbAllPosts = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['comment_body'],
        },
        {
          model: Usercred,
          attributes: [
            'id',
            'usercred_name',
          ],
        },
      ],
    });

    const posts = dbAllPosts.map((post) =>
      post.get({ plain: true })
    );
console.log(posts);
    res.render('homepage', { // refers to homepage.handlebars
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one post by its ID
router.get('/post/:id', async (req, res) => {
  try {
    const dbAllPosts = await Post.findByPk(req.params.id, {
      
      include: [
        {
          model: Usercred,
          attributes: [
            'id',
            'usercred_name',
          ],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'created_at',
          ],
          include: [
            {
              model: Usercred,
              attributes: [
                'id',
                'usercred_name',
              ],
            }
          ],
        },
      ],
    });

    const post = dbAllPosts.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'post' template

console.log(post);
    res.render('post_comment', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// get dashboard
router.get('/dashboard',  withAuth, async (req, res) => {
  try {

    // if(!req.session.loggedIn){
    //   res.redirect('/login');
    //   return;
    // }
    // to request all my existed posts in db with comments to them  ???????????
    // to get current user ID
    const dbAllMyPosts = await Post.findAll({
      where: { user_id: req.session.userId },  // ??? 1/13/23 to filter out Posts by user ID ??? 
      include: [
        {
          model: Comment,
          attributes: ['comment_body'],
        },
      ],
    });

    const my_posts = dbAllMyPosts.map((post) =>
      post.get({ plain: true })
    );
console.log(my_posts);
console.log(req.session.loggedIn, 106);
    
      res.render('dashboard', { // refers to homepage.handlebars
      my_posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// to open new post
router.get('/dashboard/newpost', async (req, res) => {
  try {
    res.render('dashboardNewPost', { // refers to dasbordNewPost.handlebars
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// to open post by id ????? how to get an ID for post in dasboard
router.get('/dashboard/mypost/:id', async (req, res) => {
  try {
    const dbAllPosts = await Post.findByPk(req.params.id, {
      
      include: [
        {
          model: Usercred,
          attributes: [
            'id',
            'usercred_name',
          ],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_body',
            'created_at',
          ],
          include: [
            {
              model: Usercred,
              attributes: [
                'id',
                'usercred_name',
              ],
            }
          ],
        },
      ],
    });

    const post = dbAllPosts.get({ plain: true });
    // Send over the 'loggedIn' session variable to the 'post' template

console.log(post);
    res.render('dashboardPost', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
