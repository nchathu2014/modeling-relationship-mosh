const mongoose = require('mongoose');
/*
Object id length 24 bits
each 2 bits = 1 byte

4 Bytes = Timestamp
3 Bytes = Machine Id
2 Bytes = Process Id
3 Bytes = counter


All possibilities, 2^24 ~ 16M 
*/
const objectId = mongoose.Types.ObjectId();
console.log('ObjectId: ', objectId);

console.log('Timestamp: ', objectId.getTimestamp());

const valid = mongoose.Types.ObjectId.isValid(objectId);
const invalid = mongoose.Types.ObjectId.isValid('1234');

console.log(valid, invalid);











