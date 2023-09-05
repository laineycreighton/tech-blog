const router = require('express').Router();
const {Post} = require('../../models');
const withAuth = require('../../utils/auth');

//Create a new Post
router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
  //Delete a Post
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const PostData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!PostData) {
        res.status(404).json({ message: 'No Post found with this id!' });
        return;
      }
  
      res.status(200).json(PostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });