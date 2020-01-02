const data = {
    name: '123',
    set: 123,
    name1: 'xxxx',
    xzc: 'liof'
}

const {name, ...obj} = data

console.log(name)
console.log(obj)