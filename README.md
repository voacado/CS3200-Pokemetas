# Pokemetas
The website is located at https://cs3200-pokemetas.herokuapp.com. This website was originally created for the final project of our Database Design class at Northeastern University. Cokkies are required for full functionality of this website. We plan to add more to the website, thus the site is still a WIP.

## Description
This website's main purpose allows a user to input a team of Pokemon and the application will evaluate the team to determine all the strengths and weaknesses of each Pokemon to every type matchup. There is also the ability to create an account to allow for the saving of teams for future reference.

This website was created utilizing the PERN stack (PostgreSQL, ExpressJS, React, NodeJS). This is our first time creating a project using this stack and we dedicated a large amount of time self-learning the intricacies of Javascript, HTML, and CSS.

## Local Setup
If you wish to run this project locally, this project utilizes a MERN stack (MySQL, ExpressJS, ReactJS, and NodeJS). Thus, it is essential that you have NodeJS installed and can run npm.

Before starting the application, open terminal in the root directory and run "npm install". This should install all the packages necessary to run the web application. Afterwards, two terminal instances are necessary, one for the front-end (on port 3000) and one on the back-end (port 3001).

In the root directory, run "npm run dev". This should start a server listening on port 3001. It is very common for issues to appear here, such as a message saying "jwt must be provided". In that case, you need to create a file called ".env" in the root directory and provide the respective database login credientals and JWT key. To use this file, dotenv needs to be installed which can be done through "npm install dotenv".

After the backend server is running, open a new terminal instance and change directories to "/client". In here, run "npm start". This should open a localhost instance of the site on port 3000 (http://localhost:3000/). From here, the site should be accessible.

## Credit
Anthony Vo - https://github.com/AntVo2448 <br />
Rixuan Zheng - https://github.com/rixuanzheng
