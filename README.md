# Getting Started with Movie Explorer App
This document provides guidelines on how to set it up locally and use it.

This project was created with React, Typescript, Tailwind CSS and has been deployed to vercel.
For live demo,  [click](https://movieexplorer.vercel.app/) to view it in the browser.

## Getting Started
### Prerequisites
Before you begin, ensure you have the following installed:

Node.js &
npm (Node Package Manager)

## Installation
- Clone the repository: `git clone https://github.com/rizwan-rizu/movieexplorer.git`
- Navigate to the project folder: `cd movieexplorer`
- Install dependencies: `npm install`
- Run the the appliation locally: `npm start`

## Technology Used
- Typescript
- React
- Tailwind Css
- React-router-dom
- moment (open source date library)
- axios

## Some implementation being implemented
-  Implemented re-usable API Service using Axios with Request Interceptor to append authorization header for the Bearer token and Response Interceptor to watch for the API response; if it fails with 401, then 
 retry the previous API call by getting the refreshed token. Currently response interceptor code is not implemented as there's no refresh token functionality.
- By using React Router i have created Protected Routes so that only authorized users can access the route/page based on the user roles. Currently I have commented out some logic in the protected route because of no roles and permissions.
- Implemented state management using the context api without any external library installation.
- For the purpose of code reusability, common components were created to be called whenever necessary.
- Implemented resoponsiveness so that the site appears well on smaller screens
- Implemented dark mode
- Implemented debounce search
- Implemented infinite scroll
