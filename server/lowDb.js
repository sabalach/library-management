const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json', {
  defaultValue: {
    institutionName: 'Abc School',
    institutionLocation: 'Abc School',
    institutionContact: '+977-01-01234567, info@abc.com',
  },
});
const lowDb = low(adapter);

module.exports = lowDb;
