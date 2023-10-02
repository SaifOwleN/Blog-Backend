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

const highestBlogs = (blogs) => { 

  let t = blogs.reduce((x,y)=>{
    x[y.author] = (x[y.author] || 0) + 1
    return x
  },{}
  )

  let maxC = Math.max(...Object.values(t))
  let mostF = Object.keys(t).filter((item) => {
    return t[item] == maxC
  })
  
  return {
    author: mostF[0],
    blogs: maxC
  }
}

const mostLikedAuthor = (blogs) => { 

  let t = blogs.reduce((x,y)=>{
    x[y.author] = (x[y.author] || 0) + y.likes
    return x
  },{}
  )

  let maxC = Math.max(...Object.values(t))
  let mostF = Object.keys(t).filter((item) => {
    return t[item] == maxC
  })
  
  return {
    author: mostF[0],
    likes: maxC
  }
}
module.exports = {dummy,totalLikes,highestBlogs,mostLikedAuthor}

