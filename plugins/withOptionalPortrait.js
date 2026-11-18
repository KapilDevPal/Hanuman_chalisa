// Play Console flags android.hardware.screen.portrait as a *required* feature
// (implied by android:screenOrientation="portrait"), hiding the app from
// landscape-only devices. Declare it as optional.
const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = (config) =>
  withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults.manifest;
    manifest['uses-feature'] = manifest['uses-feature'] || [];
    const name = 'android.hardware.screen.portrait';
    if (!manifest['uses-feature'].some((f) => f.$['android:name'] === name)) {
      manifest['uses-feature'].push({ $: { 'android:name': name, 'android:required': 'false' } });
    }
    return cfg;
  });
