module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      '@babel/plugin-transform-private-methods', // Add this line
      [
          'module:react-native-dotenv',
          {
              moduleName: '@env',
              path: '.env',
          },
      ],
  ],
};
