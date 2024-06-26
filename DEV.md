### Initial installation for running barebones react app
1. Install react and react dom libraries
```
npm i --save --save-exact react react-dom
```
2. Install webpack libraries to package and run your web app on your local machine
```
npm i -D --save-exact webpack webpack-cli webpack-dev-server
```
3. Install babel including appropriate loaders and presets for webpack
```
npm i -D --save-exact @babel/core @babel/preset-env @babel/preset-react babel-loader
```
4. Install libraries for styling and other utilities
npm i -D --save-exact css-loader dotenv-webpack file-loader html-webpack-plugin style-loader
5. Create index.js, App.jsx and the html file itself.
```
touch index.js
touch index.html
touch App.jsx
```

### Additional installations
1. `react-router-dom` to provide routing capability of your web application
2. `axios` for integration with APIs

### Testing installation and configurations
1. Install jest
```
npm i -D --save-exact jest jest-environment-jsdom
```
2. Install testing libraries
```
npm i -D --save-exact @testing-library/jest-dom @testing-library/react @testing-library/user-event
```
3. Create a setup file where the `App.js` / `App.jsx` is located.
```
touch setupTest.js
```
And import the following library
```
import '@testing-library/jest-dom';
```

4. Create a configuration file for jest in the root directory of the project
```
touch jest.config.js
```
And include the following configurations:
```
// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};
```

5. You can now create your own test scripts.

### For styling
Don't forget to install sass-loader & node-sass