# CO-VIDEOS

Movies against the pandemic

[Link to the app.](https://co-videos.netlify.app/)

## Getting Started

1. **Clone this repository**

```sh
git clone https://github.com/marcodca/co-videos project-name
```

2. **Installation**

```sh
cd project-name
npm install
```

Installs the necessary dependencies to run the app

3. **Start developing**

```sh
cd project-name
npm start
```

**Folder structure**

```
├───mocks
├───public
├───scripts
└───src
    ├───api
    │   └───helper
    ├───assets
    ├───store
    ├───styles
    ├───ui
    │   ├───components
    │   ├───data
    │   └───views
    └───__tests__
        ├───api
        ├───store
        └───ui
```

## About the app

The app gives you the chance of finding movies in two different ways: browsing them by different categories (genres, duration and decades they were produced) or searching by title. If you decide to browse movies by categories, they are gonna be displayed in a new path following the structure /category/CHOSEN-CATEGORY-TYPE/CHOSEN-CATEGORY. In this view, you have the possibility of sorting the movies by (ascending and descending) popularity, release date and revenue. By selecting a movie (either when browsing them by categories or when searching them by title) you are gonna be taken to a detail view of the movie at the path /movie/CHOSEN-MOVIE-ID. In this detail view you are gonna have access to more information about the production and also to the possibility of adding and removing the movie to your "Want to watch list". You can check this list at any time, by going to the path /want-to-watch . In the list you can manage your movies, by setting them as "watched" or "unwatched", or deleting them from the list. You can as well empty completely the list all at once by selecting "clear list". The movie list is persistent, so you can close or refresh the page and the records are gonna remain.

## Available scripts

`````sh
npm run dev
``

Runs the app in the development mode. Open http://localhost:8080 to view it in the browser.


````sh
npm build
``

Builds the app for production to the public folder.

````sh
npm run test
``

Run all the tests for the project.


## Acknowledgments

This project was made using React, Babel, Webpack, Redux (with the Redux-toolkit) and styled-components. Tests done with jest and react-testing-library. Movies information provided by [The movie DB](https://www.themoviedb.org/).
`````
