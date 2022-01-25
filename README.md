# APP Description

StockPlus is a single page application that can be used to simulate buying stocks from a few different companies based on their most recent market closing price or compare them. It is responsive and can be viewed from different devices.

By Default, the application calculates automatically when the Tokyo Stock Exchange is open (9:00-11:30 / 12:30-15:00 JST) and creates a global state that allow the user to purchase only when the market is open.
A switch to change the global state at any time has also been provided for testing purposes.

The user of this application can only add a maximum of 1000 stocks per company at a time to their cart and there is a maximum purchase limit of 1,000,000$ for each transaction.
When a purchase is made, a transaction is added to the store and the client can see the total amount they have invested and their most recent purchases on the Dashboard.

**Build folder is included in the project.**

### Environment & External Components Used

- [Create React App](https://github.com/facebook/create-react-app).
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [React-Toastify](https://github.com/fkhadra/react-toastify)
- [Recharts](https://recharts.org/en-US)
- [React Select](https://react-select.com/)
- [React Date Range Picker](https://github.com/wojtekmaj/react-daterange-picker)
- [Moment.js](https://momentjs.com/)
- [uuid](https://github.com/uuidjs/uuid): To create unique IDs for transactions and cart items

### API Description

The API Service is provided by [FMP](https://site.financialmodelingprep.com/).
The API key is added to calls automatically when creating the axios instance in the services/Api.js file.A default key is **NOT** provided and you must add your own by creating a .env file with the variable REACT_APP_API_KEY="YOURAPPKEY"

**Due to the free API only allowing the user to retrieve one company's stock prices at a time, and the fact that there is also a 250 call daily limit, the app is only able to load or compare stock prices one at a time.**

### Common Components & Hooks

The App contains a few custom common components created to speed up building the UI, like: Card, Button, Flex and FlexItem. It uses no external UI libraries and all components are styled using Styled Components.

A custom viewport hook using the Context API is wrapping the entire app and can be used to calculate the current page width or height. This allows for a responsive layout and components both.

### Redux Store

The App uses the redux global store to grant the user access to various features in any component.
For example the user's account balance, cart items, transactions and various important states like market status or payment processing are contained in the store to give the end user a better experience.

### App Structure and Flow

The Layout contains a side or top nav menu, which can be used to navigate to 3 different pages: Home (Portfolio), Buy Shares and Stock Comparison.
Each of these pages is built by including various reusable components.

The Portfolio page works as a kind of dashboard for the user, where they can add amount to their balance by using the AccountBalance component and simulating a payment or check their latest transactions, total amount invested and even the most recent stock movements (**data here is simulated to prevent using too many API calls due to the daily limit**).

On the Buy Shares Page, a Buy Share Form and the Cart components are combined to provide the user a simple and fast buying experience. The user should select a company from the select box to load their most recent closing price and input a stock amount higher than 0 to be able to add items to their cart.
Various checks are also performed, like checking the market status or if a user has enough balance before they can create a transaction.

The Stock Comparison page, allows the user to select between two different companies and compare their stock prices in a chart. The default date range for comparison is one year but can be altered to any date by using the date filter provided.

### Conclusion

This app was created as a test in just a few days and, although it could be optimized a little bit further, I feel like the final result is satisfying. It was really fun to code something like this using React and I hope other people will like the code or maybe use it for their reference as well.

# Commands

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
