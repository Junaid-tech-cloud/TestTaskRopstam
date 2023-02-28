/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // server: {
  //   ...(process.env.HTTPS === 'true' ? { secure: true } : {}),
  //   // Increase the timeout to 120 seconds (default is 30 seconds)
  //   requestTimeout: 120000,
  // },
};
