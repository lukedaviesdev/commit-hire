// lint-staged.config.js
module.exports = {
  '**/*.{ts,tsx,js,jsx}': (files) =>
    files
      .filter((file) => !file.startsWith('dist/'))
      .map((file) => `eslint --cache --max-warnings=0 ${file}`),
};
