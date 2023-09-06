const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');



//---------- User ----------//
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});



//---------- Post ----------//
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});



//---------- Comment ----------//
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Post, Comment };