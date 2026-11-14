# RandoPal privacy notes · V0.64

Public policy URL for this update: **https://sywan.github.io/RandoPal/privacy-policy.html**. The editable copy is [privacy-policy.html](privacy-policy.html). Check that the public page shows V0.64 before changing the Store field.

The extension handles user-provided rosters, including names, student IDs, and any other imported fields, plus selected display fields, activity progress/results, pick history, and preferences. It saves them locally through `chrome.storage.local`; the right panel's collapsed setting also uses extension-local `localStorage`. It does not transmit them to a RandoPal server or load remotely hosted code. User-initiated presentation, clipboard copy, and CSV export can show or save results on the user's device.

The only requested manifest permission is `storage`. On the Store's Privacy practices tab, describe this permission as local saving of user-created rosters, progress, results, and preferences. Since roster rows may contain names or student IDs, declare personally identifiable information as applicable. Verify all other answers against your actual use before certifying them.
