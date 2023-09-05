const formatDate = function(date){
  const postDate = new Date(date)
  return `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`
}

module.exports = {formatDate}
