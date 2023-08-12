const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      // Set up user session
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.status(200).json(user);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Invalid password' });
        return;
      }

      // Set up user session
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.status(200).json(user);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

};

module.exports = userController;
