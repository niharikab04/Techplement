# chat app

A simple chat room 
## Table of Contents

- [Project description](#project-description)
- [Features](#features) 
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)


## Project description
A simple common chat room application where any authenticated user can engage in chat.

## Features

- User Authentication: Users can securely sign up and login to the application using JWT-based authentication.
- Messaging: Sending messages is allowed only if the user is logged in.
- Theme: Users can switch between dark and light theme
   - Message Card Design

    Each message card will display:
    Avatar: An avatar containing the first letter of the username.</br>
    Username: The name of the user who sent the message.</br>
    Time and Date: The time and date when the message was sent.</br>
    Message Content: The actual message text.

## Tech Stack
 
- **MongoDB**: NoSQL database for storing data in flexible, JSON-like documents.
- **Express.js**: Web application framework for building APIs and web servers.
- **React**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side scripting.
- **Material-UI (MUI)**: React UI framework for building responsive user interfaces.
- **CSS**: Used in combination with React and Material-UI for styling the application.
- **JWT (JSON Web Token)**: Used for secure authentication and authorization in the application.
- **Socket.IO**: Enables real-time, bidirectional communication between web clients and servers.

## Installation

To run **chat app** locally, follow these steps:

1)Clone the repository:
   
   <pre>git clone https://github.com/niharikab04/chat-app</pre>
   
  (or)

  Downloading the Project ZIP File

    -Navigate to the GitHub repository (https://github.com/niharikab04/chat-app).
    -Click on the "Code" button and select "Download ZIP".
    -Extract the ZIP file to a directory on your computer.
   
 2) Navigate to the project directory:

   <pre>cd chat-app</pre>

# Server Setup

## Environment variables
First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:
     <pre>DB_URL = 'your MongoDB URL'
      JWT_SECRET = 'any secret key - must be secured'</pre>


## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:
    - Visit MongoDB Atlas Website
        - Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Create an Account
    - Log in to your MongoDB Atlas account.
    - Create a New Cluster
    - Choose a Cloud Provider and Region
    - Configure Cluster Settings
    - Create Cluster
    - Wait for Cluster to Deploy
    - Create Database User
    - Set Up IP Whitelist
    - Connect to Cluster
    - Configure the Application
    - Test the Connection
2. Create a new database and configure the `.env` file with the MongoDB connection URL.
   
## Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd server`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm start` to start the server.



## Steps to run client

1. Navigate into the client directory `cd client` and then `cd chatty`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. **Setup the Application**:
   - As specified in [Installation](#installation) section

2. **Creating an Account**:
   - If you are a new user, click on the "Sign Up" or "Register" button to create a new account.
   - Enter your username and password.

3. **Logging In**:
   - click on the "Login" button if you have an account.
   - Enter your registered username and password.

4. **Chat room**:
   - After logging in, you will see a chatroom.
   - You can now send a message.

5. **Logging Out**:
   - When you're done using the application, click on the "Logout" button to securely log out of your account.

## Future Enhancements

- **Customizable User Profiles**: Allow users to personalize their profiles with themes, profile pictures, bios, and links to their social media.

- **Rich Media Support**: Support uploading and embedding of rich media such as videos, images, and infographics.
  
- **Real-time Notifications**: Implement real-time notifications for new messages .


