class StorageService {
  /**
   *
   * @param {import('firebase-admin').app.App} app
   */
  constructor(app) {
    this.app = app;
    this.bucketName = 'file-68cd6.appspot.com';
    this.bucket = app.storage().bucket(this.bucketName);
    this.assertBucket();
  }

  insertFile(file, meta) {
    const fileinit = this.bucket.file(+new Date() + meta.filename);
    const fileStream = fileinit.createWriteStream({
      contentType: meta.headers['content-type'],
      public: true,
    });

    return new Promise((resolve, reject) => {
      file.pipe(fileStream)
        .on('error', (error) => reject(error))
        .on('finish', () => resolve(fileinit.publicUrl()));
    });
  }

  async assertBucket() {
    const rule = `rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read: if true;
          allow write: if false;
        }
      }
    }`;
    await this.app.securityRules().releaseStorageRulesetFromSource(rule, this.bucketName);
  }
}

module.exports = StorageService;
