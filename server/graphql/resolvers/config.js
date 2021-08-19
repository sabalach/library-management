const lowDb = require('../../lowDb');

module.exports = {
  Query: {
    async getConfig() {
      const db = await lowDb;
      const config = await db.getState();
      return config;
    },
  },
  Mutation: {
    async setConfig(_, {
      institutionName,
      institutionLocation,
      institutionContact,
      studentLimit,
      fineAfter,
      institutionAbb,
    }) {
      if (institutionName) {
        const db = await lowDb;
        await db.set('institutionName', institutionName).write();
      }
      if (institutionLocation) {
        const db = await lowDb;
        await db.set('institutionLocation', institutionLocation).write();
      }
      if (institutionContact) {
        const db = await lowDb;
        await db.set('institutionContact', institutionContact).write();
      }
      if (studentLimit) {
        const db = await lowDb;
        await db.set('studentLimit', studentLimit).write();
      }
      if (fineAfter) {
        const db = await lowDb;
        await db.set('fineAfter', fineAfter).write();
      }
      if (institutionAbb) {
        const db = await lowDb;
        await db.set('institutionAbb', institutionAbb).write();
      }
      return {
        institutionName,
        institutionLocation,
        institutionContact,
        studentLimit,
        fineAfter,
        institutionAbb,
      };
    },
  },
};
