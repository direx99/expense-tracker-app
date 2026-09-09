# Wallet state migration fix

- Symptom: Wallet crashed with `Cannot read property 'reduce' of undefined` after account management was introduced.
- Root cause: Existing persisted finance state predated the `walletAccounts` field.
- Fix: Wallet renders an empty account list for old state, and account reducers initialize the missing array before writing.
- Separate symptom: Metro reported `AddAccountScreen` missing even though the committed file exists. This is stale Metro cache state; restart with `npx expo start -c`.
