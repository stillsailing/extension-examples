// eval('console.log("Hello, world!")')

const myFunction = new Function('a', 'b', 'return a + b;')
console.log(myFunction(1, 2))
