const childProcess = require('child_process');

const arg = process.argv[2];

if (!arg) {
  console.error('\x1b[31m A name for a migration must be provided.\x1b[0m \n\x1b[33m npm run migration:gen -- <migrationName> \x1b[0m');
  process.exit(9)
}

try {
  const command = `tsx ./node_modules/typeorm/cli.js -d ./src/infra/database/typeorm/datasource.ts migration:generate ./src/infra/database/typeorm/migrations/${arg} -p true`;

  childProcess.execSync(command, {
    stdio: [
      0,
      1,
      2,
    ],
  });
} catch (error) {
  process.exit(1);
}