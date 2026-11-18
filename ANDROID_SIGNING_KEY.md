# Android Play signing key (Hanuman Chalisa)

## Correct key (use this)
Veerexa release keystore - SHA1 `18:8D:BB:13:29:4A:48:38:FA:7F:29:7E:04:13:54:C9:0A:47:50:7F`
- File: `.secrets/veerexa-school-release.keystore` (also in `~/hc_build/.secrets/`, india-space-hub, "key vrc" backup)
- Alias: `veerexa-school`; passwords in `credentials.json`
- Evidence: published releases 1.6.1 (14), 1.7.0 (17), 1.8.0 (18) in git history are signed with this key.
- `android/app/build.gradle` release buildType now uses `signingConfigs.release` (this key).

## Do NOT use
- Android debug key `5E:8F:16:06:...:F6:25` (`android/app/debug.keystore`, backup `.secrets/hanuman-play-signing-debug.keystore`).
  Play rejected AABs signed with it. NOTE: Play's error text lists the fingerprints
  the wrong way round ("existing" = 5E:8F is actually the file you uploaded).
- `~/.android/debug.keystore` (`8C:EB:...`).

## Build (Gradle)
    cd android && ./gradlew bundleRelease
    # output: android/app/build/outputs/bundle/release/app-release.aab
    keytool -printcert -jarfile app-release.aab | grep SHA1   # must be 18:8D:BB:...:50:7F

If the project drive is full, copy the repo to ~/hc_fresh (rsync) and build there.

## Current release
`releases/hanuman-chalisa-1.9.4-v23.aab` - 1.9.4, versionCode 23, signed 18:8D (verified).
Includes `plugins/withOptionalPortrait.js` (android.hardware.screen.portrait marked optional).
The `android/` folder is gitignored; app.json + plugins/ are the source of truth for prebuild.
