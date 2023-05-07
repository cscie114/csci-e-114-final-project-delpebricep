# CSCI E-114 Final Projcet | Gatsby Quiz Land

This Gatsby website 

**Project Site**: https://gatsby-quiz-land.netlify.app/


## Application Setup

### Step 1: Installation

To install this project, you must first clone this repository. 
Next, use your preferred shell/terminal application to navigate to the project's folder (e.g., ```cd csci-e-114-final-project-delpebricep```).

While in the project's directory, run ```npm install``` to install the project's NPM dependencies.


### Step 2: Creating an Environment File

Create a .env file at the root directory of your cloned repository. It must look like the following, substituting the client ID, client secret, and access token accordingly:

```
MONGODB_URI="[your client ID goes here]"
MONGODB_DATABASE="[your client secret goes here]"
MONGODB_COLLECTION="[your access token goes here]"
```

### Step 3: Running the Project

After completing the previous two steps, run ```npm start``` to execute the project.


## Assignment Components and Requirements

### An "Extraordinary Distinction": Leaderboards with Serverless Functions 

I made use of Netlify's serverless functions to implement Quiz Land's leaderboard feature. The function allows users to query other players' high scores for a certain quiz, as well as submit their own scores. Player names and scores are stored in the MongoDB database.



Resources

- SFX
	- freesound.org
		- adriann
		
		