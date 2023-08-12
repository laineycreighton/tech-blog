const { Post } = require('../models');

const postdata = [
    {
        title: 'Javscript',
        content: 'Javascript is a programming language.',
        user_id: 1,
    },
    {
        title: 'Degree or bootcamp?',
        content: "Comment if you think it's better to have a certification from a bootcamp or a degree in computer science." ,
        user_id: 2,
    },
    {
        title: 'Work-Life Balance',
        content: 'My favorite place to relax and reset is Lake Tahoe. Where is your favorite place to rest up?',
        user_id: 3,
    },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;