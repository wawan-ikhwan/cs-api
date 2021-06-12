require('dotenv').config();
const { exec } = require('child_process');

const processMigrate = exec(`npm run migrate-dev ${process.argv[2]}`, { env: process.env });
processMigrate.stdout.pipe(process.stdout);
