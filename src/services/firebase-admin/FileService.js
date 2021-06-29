const admin = require('firebase-admin');

const bucketName = process.env.GOOGLE_APPLICATION_CREDENTIALS.slice(30, process.env.GOOGLE_APPLICATION_CREDENTIALS.indexOf('-firebase-adminsdk'));

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: `${bucketName}.appspot.com`,
});
class FileService {
  constructor() {
    this.bucket = admin.storage().bucket();
  }

  async postFile() {
    console.log(this.bucket);
    return 'oke';
  }

  async getPageIndex() {
    const bucket = await this.bucket;
    return bucket;
  }

  async getAllFiles() {
    const files = await this.bucket.getFiles();
    const namaFiles = [];
    files[0].forEach((FILES) => namaFiles.push(FILES.name));
    return files[0];
  }

  async getFileById(id) {
    console.log(this.bucket);
    return `https://firebasestorage.googleapis.com/v0/b/${bucketName}.appspot.com/o/${id}?alt=media`;
  }
}

module.exports = FileService;
