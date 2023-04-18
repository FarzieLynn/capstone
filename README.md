# ***Military Anonymous: Connect anonymously. Thrive openly.***
## SDI-15 Capstone 
#### *April 21, 2023*
### Group C

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

## How to use Military Anonymous

### **User Functionality**

* As a user, you will be able to register from the login page under `Register`

* On the registration page, you will be able to choose to create a confidential or an anonymous profile

* Once you have completed the registration, you will receive an alert stating `Profile page created!`

* Click the `Login` link at the top right corner to be redirected to the Login Page

* From here, you will be able to login on your newly created username

* Once logged in, you will see a navigation bar at the top with the 4 pillars of health: 

	* ***Finance***
	
	* ***Fitness***
	
	* ***Mental Health***
	
	* ***Mentorship***
	
* Also in the navigation bar, you will see a `Click to Chat!` button as well as an Alert for the Suicide Safe Helpline.

* When you click on Finance you will be directed to its information page where you can read about what most struggle with and why they come to Military Anonymous for guidance.

	* There is a `Click here` option to take you to the Finance questionnaire
	
	* **Finance Questionnaire**
		
		* The purpose of the Finance Questionnaire is to gauge how well you are doing with your finances and what Military 			Anonymous can do to help you reach your financial goals.
		
		* After the completion of your Finance Questionnaire you will be redirected to either a Beginner, Intermediate, or Advanced information page based on your score from the questionnaire.
		
		* Also within the Finance hub you will be able to use a retirement calculator.
		
* When you click on Fitness you will be directed to its information page where you can read about the importance of Fitness & Nutrition while serving active duty, reserve or as a veteran.

	* There is a `Click here` option to redirect you to a BMI calculator.
	
	* list of Fitness & Nutrition Coaches who will be availble to chat with you and provide information to any of the questions that you may have.

* When you click

### **Professional User Functionality**

* As a professional, you will be able to register from the login page under `Register as Professional`

* On the registration page, you will be able to fill out all informtaion pertaining to your area of expertise and write a short "About Me" paragraph

* After you fill out the form, the `Professional Statement of Understanding` will pop-up

* After reading through the SOU, you will click the `X` at the top right corner and submit your registration form. Once your registration form is submitted, you will receive an alert stating `Profile page created!`

* Once your registration is complete, you will be able to log in

### **Admin Functionality**

* 

## Contributions
* Tanner Anderson - https://github.com/tanderson539
* Evan Colon - https://github.com/EvanColon
* Ryan Binkley - https://github.com/ryan-binkley
* Farzanna Dube - https://github.com/FarzieLynn
* Anthony Laurio -https://github.com/AnthonyLaurio
* John "Corey" Milan - https://github.com/Dasubel
