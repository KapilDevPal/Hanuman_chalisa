# Building the App Locally (Without EAS)

You can compile your React Native (Expo) app into `.apk` and `.aab` files completely locally on your machine without relying on the Expo Application Services (EAS) cloud builders. 

Here is the comprehensive guide on how to do this, how to handle the versioning, and how to verify your Google Play App Signing configuration.

## 1. Versioning Fix (Version Code 2 Conflict)
Google Play Store will reject any `.aab` upload that has the same `versionCode` as a previous release, regardless of whether that release is currently active or deactivated. 

Because your previous attempt was on version code `2`, I have manually bumped both your Android `versionCode` and iOS `buildNumber` to **`3`** in `app.json`.

Whenever you are ready for your NEXT future release, simply change this section in your `app.json`:
```json
"android": {
  "versionCode": 4 // <--- Increase this number by 1 every time you publish an update!
}
```

## 2. "Releases Signed by Google Play"
When the Google Play Console tells you **"Releases signed by Google Play"**, it means you are using Play App Signing successfully. This is **correct** and the recommended approach by Google. 

What this means for you:
1. Google holds the master app signing key securely on their servers.
2. You sign the app on your computer using an **Upload Key**.
3. When you upload the `.aab` to the Play Console, Google strips your upload signature and signs it with the true, final production signature before delivering it to Android devices.

Since EAS handled your keystores automatically so far, you’ll need to generate a local upload key if you want to bypass EAS in the future.

---

## 3. How to Build Locally (Without EAS)

Instead of sending the source code to the cloud, you will generate the native `android` and `ios` project directories locally and build them using Android Studio's build tools (Gradle).

### Step A: Prerequisites
Before you can build locally, you must ensure your computer has the necessary Android SDK tools installed.
1. Install [Android Studio](https://developer.android.com/studio).
2. Install the Java Development Kit (JDK 17 is recommended for Expo SDK 50+).
3. Set your `ANDROID_HOME` environment variables (Android Studio usually helps with this).

### Step B: The Recommended Method (Local Build + EAS Credentials)
If you want to build on your own machine but use the **correct signing keys** already stored in EAS (to avoid the "Wrong Key" error in Google Play), run this command:

**For Play Store (AAB):**
```bash
eas build --platform android --local --profile production
```

**For Testing (APK):**
```bash
eas build --platform android --local --profile preview
```
**Why this works:** It performs the heavy compilation on your machine but securely fetches the correct signing certificate from EAS so the final file is valid for Google Play.

---

### Step C: The "Hard" Method (Raw Gradle without EAS)
If you want to use `./gradlew` directly, you must first export your Keystore from EAS so your local machine knows which key to use.

1. **Export Key from EAS:**
   ```bash
   eas credentials
   ```
   *Follow the prompts: Android > production > Download keystore.*

2. **Configure Gradle:**
   Place the downloaded `.jks` or `.keystore` file in the `android/app` folder and update `android/gradle.properties` with the path and passwords provided by EAS.

---

### Step D1: Building an `.apk` (For testing on your own phone)
An APK is the executable file you can transfer to any Android phone via USB/Email to install and use immediately. It cannot be uploaded to the Play Store.

1. Navigate to the android directory:
   ```bash
   cd android
   ```
2. Run the Gradle Assemble command:
   ```bash
   ./gradlew assembleRelease
   ```
**Output Location:** Once finished, your APK will be located at:
`/home/kapil-dev-pal/Desktop/apps/hanuman_chalisa/android/app/build/outputs/apk/release/app-release.apk`

---

### Step E: Reusing a Signing Key from Another App
The user requested to use the same key as `com.veerexa.school`. To do this:

1. **Get the Keystore:** You must have the original `.jks` or `.keystore` file used for the Veerexa School app.
2. **Upload to EAS:**
   Run: `eas credentials`
   - Select `Android`
   - Select `production`
   - Choose `I want to upload my own keystore`
   - Provide the path to the Veerexa keystore file and its passwords.
3. **Google Play Console:** When creating the new app in the Play Console, choose **"Use the same key as another app"** during the "App Signing" setup step.

---

### Step D2: Building an `.aab` (For Google Play Store submission)
An Android App Bundle (AAB) is a publishing format that Google Play uses to generate optimized APKs for every specific device model in the world.

1. Navigate to the android directory:
   ```bash
   cd android
   ```
2. Run the Gradle Bundle command:
   ```bash
   ./gradlew bundleRelease
   ```
**Output Location:** Your AAB will be at:
`/home/kapil-dev-pal/Desktop/apps/hanuman_chalisa/android/app/build/outputs/bundle/release/app-release.aab`

---

> [!NOTE]
> Building natively on your own machine utilizes your RAM and CPU. If `eas build` is ever faster or more convenient, you can still use it! I am currently generating an installable APK via EAS for you so you have a playable version immediately.
