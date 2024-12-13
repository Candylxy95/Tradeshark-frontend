![app screenshot](/assets/LoadingPage.png)

# Tradeshark Mobile App

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This app was created using PERN stack (Postgresql, Express.js, React Native, Node.JS), XCODE and Visual Studios

# Database Model

> **Note**: Create a Postgresql Account and download [PG4ADMIN](https://www.pgadmin.org/download/).

![Database Model Plan](/assets/Database-model.jpg)

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

Install XCODE

- [XCODE](https://developer.apple.com/documentation/safari-developer-tools/installing-xcode-and-simulators)

There are two parts to this application. Clone both repos and set it up.

- **Frontend**: https://github.com/Candylxy95/Tradeshark-frontend
- **Backend**: https://github.com/Candylxy95/tradeshark-backend

Third Party API:

- [STRIPE](https://stripe.com/en-sg)

Environment Setup:

- **Frontend**: Create a .env file with the following

```
  SERVER=<YOUR-IP-ADDRESS:PORT>
```

- **Backend**:
  Create a .env file with the following

```
  POSTGRES_USER=<DATABASE_USER_WITH_GRANTED_ACCESS>
  POSTGRES_DB=<DATABASE_NAME>
  POSTGRES_PASSWORD=<DATABASE_PASSWORD>
  POSTGRES_PORT=<DATABASE_PORT>
  PORT=<LOCALHOST_PORT>
  ACCESS_SECRET=<YOUR_ACCESS_SECRET>
  REFRESH_SECRET=<YOUR_REFRESH_SECRET>
  STRIPE_SECRET=<YOUR_STRIPE_SECRET>
  STRIPE_PUBLISHABLE_KEY=<YOUR_STRIPE_PUBLISHABLE_KEY>
```

## Step 1: Start the Backend Server

First, you will need to start pg4admin and connect to server. Run the backend server with this command:

```bash
# run
nodemon server.js
```

## Step 2: Start the Application

Run the following command on the frontend.

### For iOS

```bash
# using npm
npx react-native run-ios
```

If everything is set up _correctly_, Metro Bundler will run in its _own_ terminal. You should see your new app running in your _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Step 3: Using the App

## Buyers

1. Navigate between two separate signup or login channel. Click on _Personal Acount_ for the buyer channel.

![Buyers Init Page](/assets/Init.png)

2. Once you have successfully signed up, you will be navigated to the respective login page

3. - Upon sign in, you will be navigated to _Home_ for buyers. Click on 'Deposit' to start adding money. Click on the button under Transactions to view your single listing transactions and subscriptions for subscription details.

![Home](/assets/Home-filled.png)
![Deposit](/assets/Deposit.png)

4. Navigate to _Listings_ to purchase listings or look at sellers's profile when you click onto their name.

![Listings](/assets/market-place.png)
![PurchaseListings](/assets/purchase-listing.png)

5. Preview your listings when navigated to _My List_, categorised into two pages, active or expired depending on the duration of your listing.

![Mylist](/assets/BuyerMyList.png)

## Sellers

1. Navigate between two separate signup or login channel. Click on _Business Acount_ for the seller channel.

![Sellers Init Page](/assets//BizInit.png)

2. Once you have successfully signed up, you will be navigated to the respective login page

3. - Upon sign in, you will be navigated to _Dashboard_ for sellers. Navigate around the bottom tabs to view _Listings_ posted by sellers, edit your _Profile_ and view purchased listings/ subscriptions in _My List_

![Dashboard](/assets/Dashboard-filled.png)

4. Navigate to _Create Listings_ to create listings.

![Listings](/assets/create-listing.png)
![ConfirmListings](/assets/confirmcreatelisting.png)

5. You may update your listings once by clicking the 'update' button and the history will be shown. No deletion is allowed. Any edits will be shown to buyers.

![UpdateListings](/assets/updatelisting.png)

6. Preview your listings when navigated to _My List_, categorised into two pages, active or expired depending on the duration of your listing.

![Mylist](/assets/seller-mylist.png)

7. Navigate to _profile_ to check out your stats and/or edit profile

![Profile](/assets/seller-myprofile.png)

# Attributions

Shark animation created by Candy.

Graphics and fonts obtained from the Midjourney:-

- [Midjourney](https://midjourney.com)
- [GoogleFonts](https://fonts.google.com)

Database used:-

- [Postgresql](https://www.mongodb.com/)
- [Pg4Admin](https://www.mongodb.com/)

Whenever we got stuck, or faced difficulties in implementing the codes or ideas, we would refer to the following for examples and write ups. Other sites use for reference can be found here too:-

- [W3Schools](https://www.w3schools.com/)
- [MDN](https://developer.mozilla.org/en-US/)
- [stackoverflow](https://stackoverflow.com/)
- [General Assembly Course Notes](https://generalassemb.ly/)
- [React Native](https://reactnative.dev)
- [React](https://react.dev/learn)
- [Database Mindmap](https://draw.io)
- [Stripe](https://stripe.com/en-sg)

# Technologies Used

1. HTML
1. CSS
1. JavaScript
1. React
1. React Native
1. Visual Studio
1. Github
1. Chrome
1. Postman
1. Postgresql
1. Trello
1. Stripe
1. Xcode

# Next Steps

Next steps: Planned future enhancements (stretch goals).

- Third party API to fetch available tickers
- Third party API to check if listings entry price has been triggered
- Addtional filter to search listings
- Display risk reward by ratio
- Re-styling
