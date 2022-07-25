Scandiweb React Developer test

For this project it was necessary to use class components due to project requirements. This raised a few challenges, because many libraries have depreciated class components, and while some still provide support for it they strongly recommend using functional components.

One of the libraries which has depreciated class components was react router. In the latest version there is no support for class components and hooks must be used. The choice here was to try and use an older react router version, or use a higher order component which uses functional component and hooks. I made a choice in favor of the hoc, since I believe that using older versions of libraries may rise other compatibility issues.

Initially, I planned to use Recoil instead of Redux. Since i have been using Redux in previous projects, and Recoil sounds very interesting and I wanted to try it out. But the I also realized that Recoil does not support class components, and thus I went with Redux. Redux has support for class components and it was fairly easy to implement it. But they do recommend using functional components.

During this project I learned a few new skills and technologies. Before I did not use class components, so I had to learn some aspects related to them. But I enjoyed this experience and in the end it did not feel much different. Except some compatibility issues.

One of the requirements was to use Apollo and GraphQL, which I havent used before and thus had to learn the basics. Before I always used an Express backend with REST api endpoints, thus I was very used to this approach. But after reading some documentation and some GraphQL videos, I was able to implement it and would love to try to build my own backend based on GraphQL. I liked the flexibility of calling different data from frontend.

The backend was provided by Scandiweb for this project and is available here: https://github.com/scandiweb/junior-react-endpoint To view this project it is necessary to launch your own instance of GraphQL server.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
