### Initial installation for running barebones react app
1. Install react and react dom libraries
```
npm i --save --save-exact react react-dom
```
2. Install webpack libraries to package and run your web app on your local machine
```
npm i -D --save-exact webpack webpacl-cli webpack-dev-server
```
3. Install babel including appropriate loaders and presets for webpack
```
npm i -D --save-exact @babel/core @babel/preset-env @babel/present-react babel-loader
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