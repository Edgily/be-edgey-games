# Edgey Games
### Portfolio Database and Server Project

GitHub version: https://github.com/Edgily/edgey-games

Hosted version: https://edgey-games.herokuapp.com/api

JSON Viewer extension: https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh/related

### Description
This is a back end project done while studying at Northcoders! It sets up a basic server and database with some test data. Go to the above hosted version link to see a list of all the endpoints and what you can do with them! Definitely recommend having the JSON Viewer extension.

### Installaton process:

1. Clone
2. Install Dependencies
3. Create .env Files
4. Seed Database
5. Run Tests

### Clone
On the repo main page near the top there is a bright green 'Code' button, click it. You then need to copy the URL displayed. In your terminal (command line), navigate to the folder where you wish to clone the project to. Then run the command 'git clone PROJECT_URL' e.g. 'git clone https://github.com/Edgily/edgey-games'. This will install everything into an 'edgey-games' folder.

### Install Dependencies
This project was made with (and may depend on):
- node v17.1.0
- PostgreSQL 12.9

Navigate into the newly created 'edgey-games' folder in your terminal. In the terminal, run the command 'npm i' which will install all other dependencies. 

### Created .env Files
We need two .env files to tell our code which database it needs to use. Create two files in the main 'edgey-games' folder, one called '.env.test' and another called '.env.development'. Inside these files we need to set the database name. The .env.development file should look like: 'PGDATABASE=nc_games' and the .env.test file should look like 'PGDATABASE=nc_games_test'.

### Seed Database
Within the edgey-games folder in your terminal, run 'npm run setup-dbs' to create the databases on your machine. Then you can run the 'npm run seed' command to seed the dev database. You can also run 'npm run seed:prod' to seed the production database with data.

### Run Tests
Simply run the command 'npm t' in your terminal to run all tests. (Which hopefully should pass!)

### You're Done!
Thanks for checking out my project! Now you can mess around with accessing the different endpoints.
