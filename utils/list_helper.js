const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let total = 0
  let x = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > total) {
    total = blogs[i].likes,
    x = i
    }
  };

  return blogs[x]
}
    module.exports = {dummy,totalLikes}

