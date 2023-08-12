const { Post } = require('../models');

const postdata = [
    {
        title: 'Javscript',
        content: 'Javascript is a programming language.',
        user_id: 1,
        post_date: '8/23/23'
    },
    {
        title: 'Degree or bootcamp?',
        content: "Comment if you think it's better to have a certification from a bootcamp or a degree in computer science." ,
        user_id: 2,
        post_date: '2/18/23'
    },
    {
        title: 'Work-Life Balance',
        content: 'My favorite place to relax and reset is Lake Tahoe. Where is your favorite place to rest up?',
        user_id: 3,
        post_date: '7/4/23'
    },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;