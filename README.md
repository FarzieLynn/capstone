# SDI Capstone
### Group C

## ***Military Anonymous: Connect anonymously. Thrive openly.***

### Problem Statement
Serving in the military can be a challenging and complex experience, and there are times when service members need help with various issues such as mental health, fitness, personal finance, and mentorship/networking. However, traditional methods of seeking help, such as visiting a Chaplain in person, may not be ideal for everyone. This is where ***Military Anonymous*** comes in - a modern, digital application that offers a safe and confidential space for military members from all branches to anonymously connect with qualified, experienced professionals in these areas.


### The Setup

**1. Fork & Clone** 

* Fork this repository in GitHub and clone it locally onto your machine.
	* https://github.com/FarzieLynn/capstone.git
	* Once cloned:
			* open the repo with VSCode

**2. Setup your .env files**

* In the root folder, create a *.env* file.
	* Copy the contents of *.env copy* into your *.env* file.

* Repeat this process in the /backend folder.

**3. Set up your Database**

* Open Docker Desktop

* Go to your VSCode and open your terminal

* From the root project directory, run the command *docker-compose up* **This should create your docker container, run it, and create a database named capstone_db.

* To verify it is up and running, open Docker Desktop and open the terminal for your postgres instance

* Run the following command `psql -U postgres`

* When you type in `\l` it will populate a list of databases. You should see capstone_db in the list.

**3. Back-end**

**NOTE: be sure to change directory to the back-end**

* Type `npm install`

* Next, you will need to run the following command `npx knex migrate:latest`

* Once that is complete, run the following command `npx knex seed:run`

* Run `npm start` to start running your back-end 

**4. Front-end**

**NOTE: be sure to change directory to the front-end**

* Type `npm install` to gain all the dependencies required for this application (bcrypt, cookie-parser, cors, dotenv, express, knex, morgan, nodemon, pg)

* run `npm start` to start your server 

## Contributions
* Tanner Anderson - https://github.com/tanderson539
* Evan Colon - https://github.com/EvanColon
* Ryan Binkley - https://github.com/ryan-binkley
* Farzanna Dube - https://github.com/FarzieLynn
* Anthony Laurio -https://github.com/AnthonyLaurio
* John "Corey" Milan - https://github.com/Dasubel
