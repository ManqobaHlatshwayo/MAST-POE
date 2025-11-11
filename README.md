# ChefCast – Menu Management Application

ChefCast is a menu management app designed to help a chef add, review, filter, and manage restaurant menu items. Guests can also browse the menu and filter dishes based on meal courses. The design is simple and clear so the app can be used easily in a kitchen environment.

This submission forms Part 3 of the Portfolio of Evidence for the Mobile Application Development module.

## Features Overview

- Splash Screen when opening the app
- Home Screen displaying:
  - Full menu list
  - Total number of menu items
  - Average price per course (Breakfast, Lunch, Dinner, Dessert)
- Add Dish Screen where the chef can:
  - Enter a dish name and description
  - Select a course from a dropdown
  - Enter the price
  - (Optional) add an image URL
- Delete functionality to remove menu items
- Menu stored in an array and updated in real-time
- Filter Screen where guests can filter dishes by course
- Refactored multi-screen structure for clarity and usability

## Programming Requirements Demonstrated

| Requirement | Where It Was Used |
|-----------|-------------------|
| `for` loop | Used to group menu items together by course before calculating averages |
| `while` loop | Used to count menu items when displaying total count |
| `for...in` loop | Used to iterate through grouped course objects and compute average prices |
| Custom functions | Used to add, remove, group, and calculate menu information |
| Global state (shared menu array) | Stored in `App.tsx` and passed into screens as props |
| Code organization | Screens separated and UI logic refactored into reusable components |

## Application Screens

| Screen | Purpose |
|--------|---------|
| SplashScreen | Short animated intro before the app starts |
| HomeScreen | Displays the complete menu and average prices |
| AddDishScreen | Allows the chef to add new menu items |
| FilterScreen | Allows the guest to filter menu items by course |

## Project Structure

```
App.tsx
types.ts
README.md

/screens
  SplashScreen.tsx
  HomeScreen.tsx
  AddDishScreen.tsx
  FilterScreen.tsx
```

## Change Log (Part 2 → Part 3)

| Update | Reason / Outcome |
|-------|------------------|
| Moved Add Dish feature to its own screen (`AddDishScreen`) | Matches task requirement and improves UI clarity |
| Created `FilterScreen` that filters items by course | Allows guests to browse dishes more easily |
| Added average price section to HomeScreen | Demonstrates loop logic and provides menu insights |
| Converted menu list into shared state inside `App.tsx` | Ensures all screens update automatically when dishes are added or removed |
| Implemented delete confirmation and item removal | Prevents accidental menu edits |
| Removed nested ScrollView + FlatList structure | Fixed virtualization errors |
| Replaced default Picker with `react-native-picker-select` | Ensures consistent dropdown behavior across devices |
| Styled UI screens consistently | Improved usability and maintains professional visual identity |
| Added variable naming consistency and code comments | Improves readability and meets coding standards |

## Installation and Running the App

```
npm install
expo start
```

Open the app in **Expo Go** on a phone or emulator.

## Video Demonstration 
https://youtube.com/shorts/VQABY_RhbHs?si=h_wSMnE1gC4Bi7VI

The video will include:
1. Splash screen opening
2. Viewing menu list and average price section
3. Adding a dish
4. Deleting a dish
5. Filtering menu by course
6. Returning to HomeScreen

## Notes for Marker

- All loops (`for`, `while`, `for...in`) are used intentionally.
- Global state is maintained in App.tsx.
- Screen separation improves maintainability and supports the UX purpose.
