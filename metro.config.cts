/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Use module.exports for CommonJS
module.exports = withNativeWind(config, { input: './global.css' });
