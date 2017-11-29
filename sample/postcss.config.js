module.exports = {
  plugins: {
    'pipe-css-splitter': { 
      listenFor: ['.dark', '.light'], 
      extract: ['color', 'background-color', 'border', 'border-color'] 
    },
  },
};
