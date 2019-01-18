let moment = require('moment');

// let date =  new Date();
// console.log(date.getMonth());

// Dec 10th, 2018 12:55:19 pm
let date = moment();
date.add(1, 'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY hh:mm:ss a'));

// 12:59 am
console.log(date.format('h:mm a'));

let someTimestamp = moment().valueOf();
console.log(someTimestamp);
