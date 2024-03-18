[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=MychelGarzon_countriesReact&metric=bugs)](https://sonarcloud.io/summary/new_code?id=MychelGarzon_countriesReact)

# Countries App

This is a country app that displays countries information, including their flag, name, official name, languages, currency, and population.

## Steps

This app uses Firebase for user authentication and to store users favorite countries. Saved favorites are displayed each time the user logs in.

- If you haven't registered yet, follow the steps to register by providing your name, email, and password.
- If you've already registered, you can log in using your credentials.
- Upon successful login, you can view the list of countries. By clicking on the heart icon, you can save your favorite countries, which will be displayed on the favorites page.
- If you want to see more information about a country, click on its flag. You'll be able to view information such as:
  - Capital
  - Current Weather
  - Borders with other countries. You can click on them to visit those countries and see more information.
  - A random picture of the country
  - Map showing the location

## Instructions

- Install dependencies, use the following command

```npm
npm install
```

- To run the app, use the following command:

```
npm run dev
```

## Data

- The countries information is being fetched from [Restcountries](https://restcountries.com)
- The maps are fetched from the API provided by [TomTom](https://developer.tomtom.com/)
- Authentication and data storage are handled by [Firebase](https://firebase.google.com/)
- Weather information is sourced from [Openweathermap](https://api.openweathermap.org)
- Images are obtained from [Unplash](https://unsplash.com/developers)

## Details about the code

This app was built for the React-Advance course at Business College Helsinki in Finland.
The project aimed to develop a React application and learn state management using Redux, along with utilizing Firebase for authentication and data storage.

## Techonlogies used

- React
- Redux
- Vite
- Firebase
- React-bootstrap

## Live Link

[Countries](https://countries-react-mg.netlify.app/)
