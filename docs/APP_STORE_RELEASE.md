# Releasing Hanuman Chalisa on the Apple App Store

> Verified against Apple and Expo documentation on 24 October 2026. Store rules change; re-check the official links in section 10 immediately before submission.

A step-by-step guide for the first iOS release (v1.8.0) of this Expo app, using EAS Build and EAS Submit. No Mac is needed: EAS builds and signs the app in the cloud.

---

## 0. Fix before you submit: the audio file

The bundled recording is `assets/audio/Shree Hanuman Chalisa-(Mr-Jat.in).mp3`, downloaded from a music site. Apple rejects apps that ship copyrighted recordings without permission (Guideline 5.2, Intellectual Property), and the same risk applies on Google Play.

Before submitting, do one of these:

- Replace it with a recording you own, or one that is clearly royalty-free or public domain, and keep the licence.
- Get written permission from the rights holder.
- Remove the audio feature from the iOS release.

---

## 1. What you need

| Item | Notes |
|---|---|
| Apple Developer Program | Join at [developer.apple.com/programs](https://developer.apple.com/programs/). Check Apple's page for the current local price and enrolment requirements. |
| Expo account | The same account this project already uses (`extra.eas.projectId` in `app.json`). |
| EAS CLI | `npm install -g eas-cli`, then `eas login`. |
| Privacy policy URL | **Required** for every app. A simple page on `hanumanchalisa.club` is enough (see section 6). |
| Support URL | Any page where users can contact you, for example a contact page or a `mailto:` link on your site. |
| An iPhone (recommended) | For testing through TestFlight before release. |

---

## 2. Already configured in this repo

| Setting | Value | Where |
|---|---|---|
| App version | `1.8.0` | `app.json` → `expo.version` |
| iOS build number | `1` | `app.json` → `expo.ios.buildNumber` |
| Android version code | `18` | `app.json` → `expo.android.versionCode` |
| Bundle ID | `com.kapildevpal.hanumanchalisa` | `app.json` → `expo.ios.bundleIdentifier` |
| Export compliance | `ITSAppUsesNonExemptEncryption: false`, so App Store Connect stops asking about encryption on every build | `app.json` → `ios.infoPlist` |
| WhatsApp share | `LSApplicationQueriesSchemes: ["whatsapp"]`, so iOS can detect WhatsApp | `app.json` → `ios.infoPlist` |
| Background audio | Enabled by default by the `expo-audio` plugin | `app.json` plugins |
| Microphone access | Disabled on iOS and Android; this app plays but does not record audio | `app.json` → `expo-audio` plugin |
| Photo permission text | "Allow Hanuman Chalisa to access your photos…" | `expo-image-picker` plugin |
| Splash screen | Logo on `#FAF8F5` | `expo-splash-screen` plugin |
| In-app updates | Android only; does nothing on iOS (Apple has no equivalent) | `src/services/inAppUpdates.ts` |
| iOS build image | Expo SDK 57 image with Xcode 26.6 / iOS 26 SDK | `eas.json` → `build.production.ios.image` |

> **The bundle ID is permanent.** Once an app is created in App Store Connect with `com.kapildevpal.hanumanchalisa`, it can never change. Apple doesn't allow underscores, which is why it differs from the Android package `com.kapildevpal.hanuman_chalisa`.

### Version numbers with EAS

`eas.json` has `"appVersionSource": "remote"` and `"autoIncrement": true` for production. This means:

- **Version** (`1.8.0`, the one users see) comes from `app.json`. Change it there for each release.
- **Build number** (iOS) and **version code** (Android) are stored on EAS servers and go up by one automatically on every production build. The numbers in `app.json` are only a fallback.

Useful commands:

```bash
eas build:version:get -p ios        # current remote iOS build number
eas build:version:get -p android    # current remote Android version code
eas build:version:set -p android    # only if Play rejects a code as already used
```

### Current Apple SDK requirement

Apple currently requires iOS uploads to be built with Xcode 26 or later. Expo SDK 57's pinned `sdk-57` image uses Xcode 26.6, so this project meets that requirement. Do not change the production image to `latest` without checking Expo's SDK compatibility notes.

---

## 3. Decisions to make before the first build

1. **iPad support.** `supportsTablet` is `true`, so Apple will also review the app on iPad and requires **iPad screenshots**.
   - Keep it if the layout looks good on iPad, which it should, since the screens are single-column.
   - Or set `"supportsTablet": false` in `app.json` to release iPhone-only. You can't turn iPad support off later without a new build, and Apple discourages removing it once it has shipped.
2. **App name.** "Hanuman Chalisa" is very likely taken on the App Store. Names must be unique and up to 30 characters. Have alternatives ready, for example:
   - `Hanuman Chalisa – 13 Languages`
   - `Hanuman Chalisa: Jaap & Aarti`
   - `Shri Hanuman Chalisa Path`

   The name on the home screen still comes from `expo.name` ("Hanuman Chalisa"); only the store listing name has to be unique.
3. **App Store ID for reviews.** After step 4 you'll have an Apple ID number for the app (for example `6741234567`). Put it in `src/services/appReview.ts`:

   ```ts
   const IOS_APP_STORE_ID = '6741234567';
   ```

   This enables the "Rate this app" link and the fallback review dialog on iOS. The native review prompt works without it.

---

## 4. Create the app in App Store Connect

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → **Apps** → **+** → **New App**.
2. Fill in:
   - **Platforms:** iOS
   - **Name:** your chosen store name (section 3)
   - **Primary language:** English (India) or Hindi
   - **Bundle ID:** `com.kapildevpal.hanumanchalisa`. If it isn't in the list yet, run the first `eas build` (section 5) first; EAS registers it for you. Or add it under *Certificates, Identifiers & Profiles → Identifiers*.
   - **SKU:** anything unique to you, for example `hanuman-chalisa-ios`
   - **User access:** Full access
3. Open **App Information** and copy the **Apple ID** (a number). That's the `IOS_APP_STORE_ID` from section 3, and the `ascAppId` used in section 5.

---

## 5. Build and upload with EAS

### 5.1 Add the iOS submit settings (once)

In `eas.json`, extend the `submit.production` block:

```json
"submit": {
  "production": {
    "ios": {
      "ascAppId": "6741234567"
    }
  }
}
```

### 5.2 Build

```bash
eas build -p ios --profile production
```

- The first time, EAS asks to log in to your Apple account and offers to **create the distribution certificate and provisioning profile**. Say yes to everything; EAS stores and manages them.
- The build takes about 15–25 minutes in the cloud.

### 5.3 Upload to App Store Connect

```bash
eas submit -p ios --latest
```

Or build and submit in one go:

```bash
eas build -p ios --profile production --auto-submit
```

After uploading, Apple processes the build for about 10–30 minutes. You'll get an email when it appears under **TestFlight**.

---

## 6. App Store listing

Fill these in on the version page (**App Store** tab → **1.8.0 Prepare for Submission**).

### Text

| Field | Limit | Suggested |
|---|---|---|
| Subtitle | 30 chars | `Read, listen & chant daily` |
| Promotional text | 170 chars | `Read Hanuman Chalisa in 13 Indian languages, listen to the path, count your jaap and keep a sankalp. Simple, private, ad-free.` |
| Keywords | 100 chars, comma-separated, no spaces | `hanuman,chalisa,bajrang,baan,aarti,jaap,mantra,ram,sundarkand,bhakti,hindu,prayer,path,stotra` |
| Support URL | required | e.g. `https://hanumanchalisa.club/contact` |
| Marketing URL | optional | `https://hanumanchalisa.club` |
| Copyright | required | `2026 Kapil Dev Pal` |

**Description (draft):**

```
Hanuman Chalisa brings your daily devotion to Shri Hanuman into one calm, simple app.

READ IN YOUR LANGUAGE
• Complete Hanuman Chalisa with doha and all 40 chaupais
• 13 languages: Hindi, English, Marathi, Nepali, Bengali, Assamese, Gujarati, Punjabi, Odia, Tamil, Telugu, Kannada and Malayalam
• Adjustable text size and a reading progress bar

LISTEN
• Play the Chalisa path, even in the background

JAAP & SANKALP
• Tap-to-count jaap with Ram, Om, Hanuman and more, with round goals of 11 to 1008
• Take an 11, 21 or 40-day sankalp and mark each day
• Streaks and monthly totals

SPIRITUAL LIBRARY
• Hanuman Aarti, Ashtak, Bajrang Baan, Sundarkand, Hanuman Kavach and more

MY NOTES
• Save photos of mantras and read them full screen, with zoom
• Everything stays on your phone

Daily wisdom, dark mode, and app language in English, Hindi or Punjabi.

Jai Shri Ram!
```

### Category and age rating

- **Primary category:** Lifestyle (or Reference). **Secondary:** Books.
- **Age rating:** answer "None" to every question. The result is **4+**.
- In-app purchases: none. Price: Free.

### Screenshots

Take them in TestFlight on a real device or the iOS Simulator. Apple scales the largest iPhone size down to smaller phones.

| Device | Size (portrait) | Needed |
|---|---|---|
| iPhone 6.9" | 1320 × 2868 (or 1290 × 2796) | **Required**, 3–10 images |
| iPad 13" | 2064 × 2752 | **Required if `supportsTablet` is `true`** |

Suggested order:
1. Home
2. Chalisa reading (a regional language looks distinctive)
3. Language picker
4. Jaap counter
5. Library
6. My Notes gallery
7. Dark mode

### App Privacy (the "nutrition label")

Under **App Privacy** → **Get Started**:

- First audit `mandirpedia.com` as described below.
- If neither the native app nor the embedded site collects data under Apple's definitions, choose **No, we do not collect data from this app**.
- If the site or any third-party code collects data, choose **Yes** and declare every applicable data type, purpose, identity-linking, and tracking practice.

For the native features:
- Notes, photos, jaap counts and settings are stored only on the device (AsyncStorage and the app's document folder).
- There's no account, analytics or ads.
- The native app does not request microphone access.

The **privacy policy URL** is still required, and Apple also requires the policy to be easily accessible inside the app. The app now has **More → Privacy Policy**. Publish the completed [`PRIVACY_POLICY_TEMPLATE.md`](./PRIVACY_POLICY_TEMPLATE.md) at a stable public HTTPS URL and enter that URL in App Store Connect.

**Do not select “No data collected” until the website has been audited.** The Explore pages load `mandirpedia.com` inside a web view. If that site uses analytics, advertising, cookies, forms, or other tracking, those practices can affect both the privacy policy and App Store privacy answers. Either disclose every applicable data type accurately or remove/open the Explore pages outside the app before submission.

---

## 7. Test with TestFlight

1. In App Store Connect → **TestFlight**, the build appears after processing.
2. Add yourself under **Internal Testing**. Internal testers need no Apple review and can install straight away.
3. Install the **TestFlight** app on your iPhone and accept the invite.

Check these on a real iPhone before submitting:

- [ ] Splash shows the logo centred, then the Home screen (no second logo)
- [ ] Chalisa: switch languages (try Tamil and Malayalam), change text size, scroll to the end
- [ ] Language page slides up and doesn't cover the tab bar
- [ ] Audio plays and keeps playing with the screen locked
- [ ] Jaap: counting, vibration on round complete, reset asks for confirmation
- [ ] Sankalp: start, mark a day, reset
- [ ] My Notes: add several photos, save, open the gallery, use full-screen swipe and pinch-zoom; the photo permission dialog shows the right text
- [ ] Notes and photos are still there after force-closing the app
- [ ] Share on WhatsApp opens WhatsApp (falls back to the share sheet if WhatsApp isn't installed)
- [ ] Daily reminder notification arrives
- [ ] Dark mode on every screen
- [ ] App language EN / HI / PA

---

## 8. Submit for review

1. On the **1.8.0** version page, under **Build**, click **+** and pick the TestFlight build.
2. Under **App Review Information**:
   - **Sign-in required:** No.
   - **Contact:** your name, phone and email.
   - **Notes** (this helps avoid a "spam / copycat" rejection):

     ```
     No login required. All features work offline and data stays on the device.
     Main features: Hanuman Chalisa in 13 Indian languages (Chalisa tab → language button),
     audio recitation (Home → Listen card), jaap counter (Jaap tab), 11/21/40-day sankalp
     tracker, spiritual library, and private notes with full-screen mantra photos
     (More → My Notes). Background audio is used only to keep the Chalisa recitation
     playing when the screen is locked.
     ```
3. **Version release:** choose *Manually release this version* for the first release, so you control the launch day.
4. Click **Add for Review** → **Submit to App Review**.

Review time varies. Watch the status and messages in App Store Connect rather than planning around a fixed review duration.

### Common rejection reasons for an app like this

| Guideline | Risk | What to do |
|---|---|---|
| **4.3 Spam** | There are many Chalisa apps | Point to what's different in the review notes and screenshots: 13 languages, jaap, sankalp, mantra photo notes |
| **5.2 Intellectual property** | The audio recording (section 0) and any third-party artwork | Use only content you own or have a licence for |
| **2.5.4 Background modes** | Audio background mode must be used for real audio | Already justified by the recitation; mention it in the notes |
| **5.1.1 Privacy** | Missing or broken privacy policy URL | Make sure the URL loads |
| **2.1 Performance** | Crashes or empty screens during review | Run through the TestFlight checklist |
| **4.2 Minimum functionality** | App looks like a website wrapper | The Mandirpedia/Rashifal web views are extras, not the core; keep them that way |

---

## 9. Final release commands

Run these from the project root:

```bash
npm run release:check
npm run build:ios
npm run submit:ios
```

`release:check` needs internet access because `expo-doctor` may be downloaded by `npx`. The submit command requires the App Store Connect app record to exist. If EAS cannot match it automatically, add its numeric Apple ID as `submit.production.ios.ascAppId` in `eas.json` as shown in section 5.1.

Never commit an App Store Connect API private key (`.p8`), Apple password, or EAS access token. Use EAS credentials or secret environment variables.

---

## 10. Official references

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Apple: Manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)
- [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- [Apple: Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds)
- [Expo: App version management](https://docs.expo.dev/build-reference/app-versions/)
- [Expo: EAS Build infrastructure](https://docs.expo.dev/build-reference/infrastructure/)
- [Expo Audio configuration](https://docs.expo.dev/versions/latest/sdk/audio/)

If you're rejected, reply in **Resolution Center**. Small fixes are often accepted with just an explanation; otherwise make a new build and submit again.

---

## 9. Release

- After approval, click **Release This Version**. The app appears on the store within a few hours.
- Optional: turn on **Phased Release for Automatic Updates** for later versions. It rolls updates out to existing users over 7 days.

---

## 10. Future updates (iOS and Android)

1. Bump `expo.version` in `app.json` (for example `1.8.0` → `1.8.1`, or `1.9.0` for new features). Build numbers increase automatically (section 2).
2. Build and submit:

   ```bash
   # iOS
   eas build -p ios --profile production --auto-submit

   # Android (Google Play)
   eas build -p android --profile production --auto-submit
   ```

3. **iOS:** create the new version in App Store Connect (**+ Version**), add "What's New" text, pick the build, and submit for review.
4. **Android:** promote the build in Play Console. Users on an older version get the in-app **Update Now** dialog automatically.

> **Android submit:** the first `eas submit -p android` needs a Google Play service-account JSON key. See [docs.expo.dev/submit/android](https://docs.expo.dev/submit/android/). Until that's set up, download the `.aab` from the EAS build page and upload it in Play Console manually.
