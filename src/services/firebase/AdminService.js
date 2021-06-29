const admin = require('firebase-admin');

class AdminService {
  constructor() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY)),
    });
  }
}

module.exports = AdminService;
