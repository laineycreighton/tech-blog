const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

//---------- Login Page | Login a User ----------//
  router.get('/', (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/homepage");
      return;
    }
    res.render('login');
  });

  router.get('/login', (req, res) => {
      res.render('login');
      console.log("login page");
    // res.redirect("/login");
  });

//---------- Homepage | Get All Posts ----------//
router.get('/homepage', withAuth, async (req, res) => {
  try {
    const timelinePosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },

        {
          model: Comment,
          attributes: ["text", "post_date", "user_id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.render('homepage', {timelinePosts, logged_in: req.session.logged_in });
  } catch (error) {
    res.json({ error, loggedIn: req.session.log_in })
  }
})

//---------- Post | Get One Post ----------//
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (!postData) {
      res.status(404).json("No post found with this ID!");
      return;
    }
    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//---------- Dashboard | Get Posts for User ----------//
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
