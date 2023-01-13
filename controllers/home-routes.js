// create routs to display all handlebars (GET routs in here)

const router = require('express').Router();
const { Post, Comment, Usercred } = require('../models'); // add table if needed

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






router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  try {
    // to request all my existed posts in db with comments to them  ???????????
    // ????? How to get current user ID ??????
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
    res.render('dashboard', { // refers to homepage.handlebars
      my_posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
