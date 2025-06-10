module.exports = {
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: 'automatic' }], // ← ini penting
    ['@babel/preset-typescript'],
  ],
};