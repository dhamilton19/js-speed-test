# JS Speed Test

This project was used to test the speed of javascript and json parsing on Android, iOS and Desktop.
All data that was used has been removed due to its potentially sensitive nature.


##Installation

1. Clone this repo
2. `npm install`
3. Set up json-db: https://github.com/dhamilton91/json-db
4. `npm start`

Unfortunately there is no router to handle going between different parts of the app.
One must go into /app/app.js and manually change the `require('./manualTest');` at the bottom to switch tests.
