// /* THIS IS JUST USED FOR TESTING PURPOSES ONLY WHICH GETS EXECUTED WHEN THE SERVER STARTS IT WILL CREATE A NEW USER IN THE DB */

// const db = require('../models');

// async function createTestUser() {
//   if ((await db.User.countDocuments({})) === 0)  {
//     const user = new db.User({ 
//       username: 'test',
//       email: 'test@test.test',
//       password: 'test123',
//       firstName: 'test',
//       lastName: 'test',
//       role: 'admin'
//     });
//     await user.save( (err) => {
//       console.log(`${user.username} CREATED AND SAVED!`);
//       if (err) console.error(err);
//     })
//     db.User.deleteOne({ username: 'test' }, (err) => {
//       if (err) console.error(err);
//       console.log('DELETED!')
//     });
//   }
// };

// module.exports = createTestUser;