const { Comment } = require('../models');

const commentdata = [
  {
    content: 'I like Javascript!',
    user_id: '1',
    post_id: '1',
  },
  {
    content: 'Bootcamp all the way!',
    user_id: '2',
    post_id: '2',
  },
  {
    content: 'Self taught for sure.',
    user_id: '2',
    post_id: '2',
  },
  {
    content: 'I go to Napa Valley!',
    user_id: '3',
    post_id: '3',
  },
  {
    content: 'San Diego is the place for me.',
    user_id: '3',
    post_id: '3',
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;