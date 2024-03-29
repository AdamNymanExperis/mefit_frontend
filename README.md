# MeFit

This project is for the Case Study at Experis Academy. Its a Fitness Application. It is a single page applicartion deployed on vercel and built with react js and is also using KeyCloak which is a Open-source identity and access management tool.

Mefit is an app where user can set up weekly goals and track them. User will also be provided with exercises. The application serves to motivate the user to become fit by tracking their goal and exercise regime.

A user manual for how to use the application can be found [here.](https://github.com/AdamNymanExperis/mefit_frontend/blob/master/User%20Manual%20of%20Me-Fit.pdf)

# Backend And Frontend
the backend for this project is build i C# and SQL Server for the Database, while Frontend is build in React.js

You can find the Backend Here [Github MeFit Backend](https://github.com/AdamNymanExperis/mefit_backend)

You can find the Frontend Here [Github MeFit Frontend](https://github.com/AdamNymanExperis/mefit_frontend)

# Deployment
The project is deployed on the following url: [MeFit Application](https://mefit-frontend.vercel.app/)

# Running the application
To run the application as a localhost you only need to have nodejs installed. Download nodejs. Once node is installed, you can download this git repository and navigate to the project folder using a commandline (such as cmd, powershell, or bash) then run "npm install", followed by "npm start". the application should now start in your webbrowser.

# KeyCloak
Before Starting the application you need to set up your keycloak. You can do it by using the following url [Cloud-IAM](https://www.cloud-iam.com)

# KeyCloak Configuration
After setting up your Keycloak server, you must copy the JSON configuration from the Admin panel. Replace the content in the public/keycloak.json file before you start. You can Find your Json Configuration in you KeyCloak Client by clicking Download adaptor configs

# Technology used
React, KeyCloak

# Open-sourch used
We also used the code on a Github repository given by Noroff (React Starter Kit With KeyCloak)


## Authors

- Adam Nyman
- Robin Stempa
- Jonas Duong
