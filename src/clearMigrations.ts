const fs = require('fs');
const path = require('path');

const migrations = path.join('src', 'migrations');

fs.readdir(migrations, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(migrations, file), (err) => {
      if (err) throw err;
    });
  }
});
