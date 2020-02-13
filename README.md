# Marfeel's exam

Simple nodejs application with an html that consumes an API containing mocked stats to be shown on graphs.

## Some comments
  - I did not add any `config` folder, as the only attribute that could have been changed, was the `port`.
  - There was a lot of ways of doing this exam, i might have not picked the right one, but this was a "clean" way of doing it.
  - Another option of doing this could be using React and also a library that had the "Donut" graph and the "Area" chart in the same library, but just adding D3js looked much lighter than just adding another complete library.
  - As i did not have many time due to the heavy work we are having right now at my current job, i was not able to do the custom slider.
  - The tests just cover the most "vulnerable" points, it could be much better and could also be tested with Nightwatch, Selenium, etc.
  - Time applied: Around 5 hours total.
  - The tests could be improved making it through nodejs starting a chrome instance instead of running in an HTML, but it was made this way to make it faster.

---
## Requirements

For development, you will only need Node.js and a node global package, npm, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm



---

## Install

    $ git clone git@github.com:brianwider/marfeel.git
    $ cd marfeel
    $ npm install


## Running the tests
  
  It will open a `testrunner.html` where will display a report of the tests running at the moment on the browser.

    $ npm test

## Running the project
  
  It will start the application on the port 3000 (or the defined one) with a watcher.

    $ npm start
    
  If you want a custom PORT, just change it the following way:

    $ PORT=3001 npm start

## Running the project on development
  
  It will start the application on the port 3000 (or the defined one) with a watcher.

    $ npm run start-dev