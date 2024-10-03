## Cat API Application
This Cat API application allows users to browse, search, and view detailed information about different cat images using TheCatAPI. The app includes a list of cats, search functionality by Cat ID, and individual cat detail pages.

## Features
Cat List: Displays a grid of cat images fetched from TheCatAPI.
Search Functionality: Users can search for cats by their ID.
Pagination: The list of cats is paginated to enhance user experience.
Cat Details: Clicking on a cat image or ID takes users to a detailed page with breed information and a larger image.
Technologies Used
Frontend: React.js

## Routing: React Router for navigation between different components
HTTP Client: Axios for making API requests
Styling: Bootstrap for responsive design
Getting Started
To get a local copy of the project up and running, follow these steps:

## Prerequisites
Node.js (version 14 or later)
npm (Node Package Manager)
Installation

## Clone the repository:
git clone https://github.com/priyankaag19/CatApiApp.git

## Navigate to the project directory:
cd cat-api-app

## Install the required dependencies:
npm install

Usage
## Start the development server:
npm start

Open your browser and navigate to http://localhost:3000.

Project Structure
cat-api-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── CatDetail.js
│   │   ├── CatList.js
│   │   └── Navbar.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── README.md

components/: Contains React components for displaying the cat list, cat details, and the navigation bar.
App.js: Main application component that sets up routing.
index.js: Entry point of the application.
styles.css: Custom styles for the application.
API Usage
The application fetches cat images and details from TheCatAPI. Make sure to include your API key in the Axios request if you're using a key that requires authentication.

## Error Handling
The application handles errors gracefully by displaying error messages to the user if there is a problem fetching cat data. If no cats are found based on the search term, a message is displayed to inform the user.
