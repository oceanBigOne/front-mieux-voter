FRONT REACTJS FOR "MIEUX VOTER" API
-----

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

# Required for development
- nodeJS
- yarn 

# Required for production
- webserver ;)

# Installation

```bash
# Install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
# Install dependencies 
yarn install
``` 

# Available Scripts

## Develop commands

`yarn start`  
Starts the development server with mocked API ( [http://localhost:3000](http://localhost:3000) and  [http://localhost:3001](http://localhost:3001) )

`yarn start-front`  
Starts the development server on front only ( [http://localhost:3000](http://localhost:3000) )

`yarn start-api`  
Starts the simulated API server only ( [http://localhost:3001](http://localhost:3001) )

## Test commands

`yarn test`  
Starts the development server and the simulated API server, then starts all tests (separate components and user stories with puppeteer)

`yarn test-components`  
Starts the test runner on components in /src dir.

`yarn test-functional`  
Starts the development server and the simulated API server, then starts to test user stories with puppeteer)

## Build command

`yarn build`  
Bundles the app into static files for production (front only).

`yarn eject`  
Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!

