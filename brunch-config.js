module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
      babel: {
          presets: ['es2015', 'es2017', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties']
      }
  }
};
