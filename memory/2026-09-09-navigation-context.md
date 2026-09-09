# Navigation context runtime fix

- Symptom: React Navigation threw `Couldn't get the navigation state. Is your component inside a navigator?` when the application rendered.
- Root cause: `BottomNavigation` was rendered beside `Stack.Navigator`, so hooks in `BottomNav` had no navigation context.
- Fix: `RootNavigator` now owns a `NavigationContainer` ref and active-route state; `BottomNav` receives both explicitly instead of using navigation hooks outside a navigator.
- Verification: `npx tsc --noEmit`, Expo Doctor, and iOS bundle export all pass.
