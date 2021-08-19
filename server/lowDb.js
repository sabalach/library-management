const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json', {
  defaultValue: {
    institutionName: 'ABC Institute of Technology',
    institutionLocation: 'Butwal,Rupandehi',
    institutionContact: 'www.kaichogroup.com',
    institutionAbb: 'abc',
    studentLimit: 1,
    fineAfter: 28,
  },
});
const lowDb = low(adapter);

module.exports = lowDb;
