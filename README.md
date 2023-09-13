BlockStakReportManagementMERN

It is a User Report Management System

# Features

User Login:
After registering, log in using your credentials (email and password). You should receive a
JWT cookie with an expiration time of one hour.

Accessing Report Data:
After logging in, you should be able to access the report table, which displays data such as
ID, name, address, phone, email, profession, and favorite colors.

Admin Actions:
If you are an Admin, you can create new reports, edit existing reports, and delete reports.
Admins have access to additional functionalities to manage the reports.

JWT Token Expiry:
Keep in mind that your JWT token expires after one hour. If your session is active and the
token expires, your task is to refresh the token and continue accessing the system.

# Getting Started

stap 1: mongodb server Install and run on local pc or add remote mongodb database url into .env file

stap 2: Clone the repository

```
> git clone git@github.com:dhimanroyit/BlockStakReportManagementMERN.git
```

stap 3: Change Directory

```
> cd BlockStakReportManagementMERN
```

stap 4: Install dependency

```
> npm install
```

stap 5: Run the app

```
> npm run devStart
```

Done

## API Documentation [Link](https://documenter.getpostman.com/view/17676493/2s9YC32ZyU)

# Developed By

- [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
- [![expressjs.com](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
- [![mongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
