# data-faker
Create fake data in Node.js with ease

## Install

```sh
npm install data-faker
```

## Usage

#### Basic Usage

```js
var dataFaker = require('data-faker');

var users = dataFaker.schema([{
    firstname: 'firstName',
    lastname: 'lastName',
    username: 'userName',
    password: 'password-8', //generates password with 8 characters 
    gender: 'gender'
}, 3]); //data object count
```

Output:
```js
users = [
{
    firstname: "Abbey",
    lastname: "Frey",
    username: "mushy_science",
    password: "18h9hhYC",
    gender: "female" },
{
    firstname: "Will",
    lastname: "Clements",
    username: "incredible_geese",
    password: "G0IOAxAA",
    gender: "male" },
{
    firstname: "Aron",
    lastname: "Mahoney",
    username: "junior_cloth",
    password: "QUMMOOGG",
    gender: "male" }
]
```

#### Custom Values

```sh
dataFaker.set('valueName', [arrayOfValues], {options})
```

Custom Value Options: 
```js
{
    range: true, // Returns random numbers between two integers
    unique: true // Returns each value in array only once
}
```

Example:

```js
var dataFaker = require('data-faker');

dataFaker.set('guitar', ['Fender', 'Gibson', 'Schecter', 'Yamaha']);
dataFaker.set('happiness', [1, 10], { range: true });
dataFaker.set('id', [0, 100], { range: true, unique: true });

var db = dataFaker.schema([{
    brand: 'guitar',
    happiness: 'happiness',
    _id: 'id'
}, 3])
````
Output: 
```js
db = [ 
    { brand: 'Fender', happiness: 2, _id: 74 },
    { brand: 'Fender', happiness: 9, _id: 48 },
    { brand: 'Gibson', happiness: 7, _id: 29 } 
]
```

#### Lorem Ipsum
```js
var posts = dataFaker.schema([{
    title: 'lorem-5', //Will generate lorem with 5 words
    body: 'lorem-20', //Will generate lorem with 20 words
    createdBy: 'userName',
    createdAt: 'date' //Will return random date between 2014 and 2015
}, 2])
```

Output: 
```js
posts = [ 
{   title: 'ex ad aliquip elit sint',
    body: 'aliqua magna aute esse nostrud laborum tempor do adipisicing in mollit reprehenderit sunt enim pariatur reprehenderit eu fugiat qui aliquip',
    createdBy: 'flaky_girl',
    createdAt: 'Sat Oct 11 2014 05:13:45 GMT+0300 (EEST)' },
{   title: 'aute pariatur aute reprehenderit est',
    body: 'sint fugiat magna do consectetur anim ex dolor quis pariatur excepteur mollit mollit magna in occaecat elit ipsum exercitation enim',
    createdBy: 'male_waves',
    createdAt: 'Wed Jul 09 2014 02:16:15 GMT+0300 (EEST)' } 
]
````






### Built-in Values (for now)

```
* 'firstName'
* 'lastName'
* 'userName'
* 'password-[integer]' 
* 'gender'
* 'eMail' // Has issues. Probably will return 'no_username@example.com'
* 'date'
* 'lorem-[integer]' 
```


