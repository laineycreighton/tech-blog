const router = require("express").Router();
const { Post , User , Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//---------- Get All Posts | GET ----------//
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

//---------- Get One Post | GET ----------//
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("singlePost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//---------- Create Post | POST ----------//
router.post('/', async (req,res) => {
  console.log(req.body)
  // try {
    const newPost = await Post.create({
			title: req.body.title,
			body: req.body.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

//---------- Update Post | PUT ----------//
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedPost[0]) {
      res.status(404).json({ message: "No post found with this ID!" });
      return;
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
//---------- Delete Post | DELETE ----------//
  router.delete("/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;