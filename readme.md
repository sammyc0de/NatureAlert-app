Final work for mobile programming course SOF008AS3A-3018.
Code written by Sami Hiltunen

Hazards in nature can be reported to the application. Application built with React native using mainly below technologies. Application tested only on iOS simulator. It's not guarenteed that it will work on Android!
- Database: SQLite, so currently it works only locally (invividual login and cloud database might be possible in future releases)
- No overflowing sections in screen: used SafeAreaView and SafeAreaProvider from 'react-native-safe-area-context'
- Navigation done by Stack and Tab Navigator using nesting navigators
- Expo Vector icons used (https://icons.expo.fyi/Index)
- React Native Dropdown picker https://github.com/hossein-zare/react-native-dropdown-picker
- Date time picker https://docs.expo.dev/versions/latest/sdk/date-time-picker/
- Current location and converting it to the address with Expo location and Geocode maps https://geocode.maps.co/
- Photo selection made with https://docs.expo.dev/versions/latest/sdk/imagepicker/
- React Native paper components used (Button, TextInput, Text)
- React Native components like Alert, FlatList, Image, Pressable, Text, StyleSheet and View