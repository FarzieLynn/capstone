# SDI Capstone
## Group C

***Military Anonymous: A safe space to address your personal needs***

### Problem Statement
As a digital military branch, we'd like to integrate the pillars of resiliency  into a usable application at the servicemember's disposal.  All authenticated users would have the opportunity to seek out mental health (first shirt/chaplain), financial wellness, physical fitness, and mentoring/networking capabilities.

Military Anonymous: Currently besides visiting the Chaplain in person, there is no way to get anonymous help from various areas of the military such as Mental Health, Fitness, Finance, and Mentoring/Networking. We aim to fix this by leveraging the four pillars of resiliency into a modern, digital application that allows military members to anonymously connect with experienced and trained professionals in the areas mentioned in an informal setting. Should the user decide they want to remove anonymity they will have the option to share their information.

Our app provides these critical functionalities.

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
