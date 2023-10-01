let string = 'ahmed'
const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
}
reverse(string)
console.log('string', reverse(string))