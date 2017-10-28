const doAfunc = (caller) => {
  console.log(`A func is done with ${caller}`)
}
const promiseB = (caller) => new Promise((res, rej) => {
  setTimeout(() => {
    res(`B is done with ${caller}`)
  }, 1000)
})

const doCfunc = (caller) => {
  console.log(`C func is done with ${caller}`)
}

const useAsync = async(callerName) => {
  doAfunc(callerName)
  let bResult = await promiseB(callerName)
  console.log('1' + bResult)
  doCfunc(callerName)
  let bResult2 = await promiseB(callerName)
  console.log('2' + bResult2)
}

const useGen = (callerName) => {
  function * gen(callerName) {
    doAfunc(callerName)
    let bResult = yield promiseB(callerName)
    console.log('1' + bResult)
    doCfunc(callerName)
    let bResult2 = yield promiseB(callerName)
    console.log('2' + bResult2)
  }
  let simulateAsyncGenerator = gen(callerName)
  const simulateAsync = (gen, res) =>{
    let {value, done} = gen.next(res)
    if (!done){
      Promise.resolve(value)
      .then(res => {
        simulateAsync(gen, res)
      })
    }
  }
  simulateAsync(simulateAsyncGenerator)
}

export {
  useAsync,
  useGen
}
