import Loki from 'lokijs';
// const Loki = require('lokijs')

// let dbLoki: Loki | null = null;
// let tabUser: Collection<any> | null = null;

const dbLoki = new Loki('codeStore.db');
const tabUser = dbLoki.addCollection('user');

function init() {
  console.log('>> init db');
  tabUser.insert({ username: 'dave', email: 'aoe.dave@gmail.com', password: 'pw' });
  tabUser.insert({ username: 't90', email: 'aoe.t90@gmail.com', password: 'pw' });
  tabUser.insert({ username: 'viper', email: 'aoe.viper@gmail.com', password: 'pw' });
  tabUser.insert({ username: 'daut', email: 'aoe.daut@gmail.com', password: 'pw' });
  tabUser.insert({ username: 'tatoh', email: 'aoe.tatoh@gmail.com', password: 'pw' });

  const user = tabUser.findOne({ username: 'dave' });
  console.log('found' + ' :: ' + JSON.stringify(user));
}

// module.exports = init;
export { dbLoki, tabUser, init };
