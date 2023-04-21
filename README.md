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
	* Once cloned, open the repo with VSCode

**2. Setup your .env files**

* In the root folder, create a *.env* file.
	* Copy the contents of *.env copy* into your *.env* file.

* Repeat this process in the /backend folder.

**3. Set up your Database**

* Open Docker Desktop

* Go to your VSCode and open your terminal

* From the root project directory, run the command `docker-compose up` 

***This should create your docker container, run it, and create a database named capstone_db.***

* To verify it is up and running, open Docker Desktop and open the terminal for your postgres instance

* Run the following command `psql -U postgres`

* When you type in `\l` it will populate a list of databases. You should see **capstone_db** in the list.

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

* Upon opening the *Military Anonymous* application, you will be greeted by the homescreen. From there you will have the option to create a profile via the `create a profile` link or by clicking the `Login` link in the top right corner

* **Register:** As a user, you can register on our website to gain access to all of our features. You have the option to register confidentially or anonymously. Just click on the "Register" button on the Login page and follow the prompts.

	* Once you have completed the registration, you will receive an alert stating `Profile page created!`

	* Click the `Login` link at the top right corner to be redirected to the Login Page

	* From here, you will be able to login on your newly created username

* **Profile Page:** Your profile page is where you can update your personal information, add a profile picture, and view your activity on the website.

* **Finance Page:** We have a dedicated Finance Page where you can access financial resources and information. You can also use our retirement calculator to help plan for your future.

* **Fitness Page:** Our Fitness Page has tools like BMI and Body Composition Calculators to help you track your fitness progress. You can also consult with a Fitness & Nutrition Professional to go over workout plans and nutrition tips to help you stay healthy.

* **Mental Health Page:** Our Mental Health Page is a great resource for anyone who needs support or guidance. You can take our mental health questionnaire to assess your mental health status and find resources to help you cope.

* **Mentorship Page:** Our Mentorship Page connects you with experienced military personnel who can offer guidance and support. You can also click on the `Forums` link to help you connect with others that could help you succeed in your career and personal life.


### **Military Anonymous Features**
#### ***Note: these features are only available to those who register/create a profile.***

* **Save and Print Information:** You have the ability to save and/or print your information from the Mental Health and Financial Management Questionnaire, as well as the information populated after completing the Retirement Calculator.

* **Quick Links:** each quick link can take you directly to either the Mental Health Questionnaire, Financial Management Questionnaire, Retirement Calculator, BMI & Body Composition Calculators, and the Home Page conveniently available on each of our informational pages.

* **Chat:** Once you've registered, you can join our chat feature to connect with other members of the Military Anonymous community. This is a great way to meet people who share similar experiences and interests.

* **Forums:** You'll see a list of forum topics on the main page. You can browse the forums by clicking on the topic that interests you. You will also be able to:

	- *Create a New Topic:* If you want to start a new discussion, click on the "New" button. You'll be asked to enter a title and description for your topic. Make sure your topic is clear and concise.

	- *Participate in a Discussion:* To join an existing discussion, click on the topic that interests you. You can read the initial post and the replies from other users. To reply to a post, click on the "Reply" button.

	- *Follow Forum Rules:* It's important to follow the forum rules to ensure a positive and respectful environment. Make sure your posts are relevant and respectful, and that you're not posting any personal information or spam.


## Contributions
* Tanner Anderson - https://github.com/tanderson539
* Evan Colon - https://github.com/EvanColon
* Ryan Binkley - https://github.com/ryan-binkley
* Farzanna Dube - https://github.com/FarzieLynn
* Anthony Laurio -https://github.com/AnthonyLaurio
* John "Corey" Milan - https://github.com/Dasubel
