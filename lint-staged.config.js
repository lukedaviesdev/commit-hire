// lint-staged.config.js
module.exports = {
  '*.{js,jsx,ts,tsx}': (files) =>
    files
      .filter((file) => !file.includes('dist/')) // Exclude built files
      .map((file) => `eslint --cache --max-warnings=0 "${file}"`),
  '*.{json,css,scss,md}': 'prettier --write',
};
