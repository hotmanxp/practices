
let p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res('done')
  }, 3000)
})

let p2 = Promise.resolve('done ==> 2')


console.log('p1: ', p1, `p2: ${p2}`)

p1
.then(resVal => {
  console.log(resVal)
  return resVal
})
.then(val => console.log(`second then: ${val}`))

let p3 = Promise.resolve(p1)

p3.then( val => console.log(`P3: ${val}`))

let fakeAjax = (url, cb) => {
  setTimeout( () => {
    cb(url)
  }, 2000)
}

let makePromise = (exp) => {
  return new Promise((res, rej) => {
    let cb = data => res(data)
    try {
      exp(cb)
    } catch (err) {
      rej(err)
    }
  })
}

let p4 = makePromise(cb => fakeAjax('www.baidu.com', cb))
p4
.then(val => console.log(`p4 ====> ${val}`))
.then(() => 'ss3333')
.then(val => console.log('then3: ', val))
.catch(err => {
  console.log('log in3', err)
})