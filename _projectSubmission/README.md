# CS3200-Pokemetas
Website for the Pokemetas site (Database Design Project)

## Setup Summary
1. "npm install" (in root)
2. Ensure that you have .env (variables below) and the npm package "dotenv" installed
3. "npm run dev" (in root - starts backend server)
4. "npm start" (in /client - starts frontend)
5. http://localhost:3000/ in browser (it is important to be on port 3000 for the client)

## Setup Tutorial
This project can be found live on https://cs3200-pokemetas.herokuapp.com/ (please note that many of the features do not work online yet as they are still coded to work on localhost).
Additionally, the GitHub repo for this project is: https://github.com/AntVo2448/CS3200-Pokemetas

If you wish to run this project locally, this project utilizes a MERN stack (MySQL, ExpressJS, ReactJS, and NodeJS). Thus, it is essential that you have NodeJS installed and can run npm.

Before starting the application, open terminal in the root directory and run "npm install". This should install all the packages necessary to run the web application. Afterwards, two terminal instances are necessary, one for the front-end (on port 3000) and one on the back-end (port 3001).

In the root directory, run "npm run dev". This should start a server listening on port 3001. It is very common for issues to appear here, such as a message saying "jwt must be provided". In that case, you need to create a file called ".env" in the root directory and copy the contents below (though, in the project submission we will include this file). To use this file, dotenv needs to be installed which can be done through "npm install dotenv".

After the backend server is running, open a new terminal instance and change directories to "/client". In here, run "npm start". This should open a localhost instance of the site on port 3000 (http://localhost:3000/). From here, the site should be accessible.

Please let us know if you have any problems setting this up.

## .env variables
CLEARDB_DATABASE_URL='mysql://root:password@localhost/u998006431_pokemon?reconnect=true'
JWT_SECRET='3k243hfsdih5f'

## Installation Pages
MySQL - https://dev.mysql.com/downloads/installer/
ExpressJS - npm install express --save
ReactJS - 
NodeJS - https://nodejs.org/en/


## Additional Information

Built following this tutorial:
https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


Run Locally:
(updates locally)
npm start in /client
npm run dev in root (app)