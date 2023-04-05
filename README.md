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

**2. Set up your Database**

* Open Docker Desktop

* Next, open your preferred terminal **NOTE: be sure the terminal you use to open your back-end is the same terminal you use for your front-end application**

* Run the following command to pull down a Dockerized Postgres image from the cloud `docker pull postgres`

* Next, you will need to create the directories that will house your database data by running this command `mkdir -p $HOME/docker/volumes/postgres`

* Run the following command to start up a Docker Postgres container instance of the image that was pulled `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`

* This should populate a PSQL Container ID. Then run the following command `docker exec -it <first 3 characters of the PSQL-Container-ID> bash`

* Run the following command `psql -U postgres`

* When you type in `\l` it will populate a list of databases. You will need to add a database to that list of databases for this application. Run the following command `CREATE DATABASE <database name>;` **NOTE: Don't forget your semicolon! If you do, immediately after you hit enter, add the semi-colon and hit enter again**

* Go to your VSCode and open your terminal

**3. Back-end**

**NOTE: be sure to change directory to the back-end**

* Type `npm install`

* You should see a `knexfile.js` and a `.env` file. If your `.env` file is not there, copy paste the following *CONNECTION_STRING='postgres://USER:PASSWORD@localhost/DATABASENAME'* into a new file named '.env' in the back-end directory. Be sure to replace the USER:PASSWORD with your postgres Username and Password, i.e.(*CONNECTION_STRING='postgres://postgres:docker@localhost/DATABASENAME'*)

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
