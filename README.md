# CSCI E-114 Final Projcet | Quiz Land

My final project is a Gatsby website that uses [The Trivia API](https://the-trivia-api.com/) to generate random collections of trivia questions and display each of them as interactive quiz games. Users can answer questions and submit their scores to online leaderboards hosted on MongoDB Atlas.

**Project Site**: https://quiz-land.netlify.app/


## Application Local Setup

### Step 1: Installation

To install this project, you must first clone this repository. 
Next, use your preferred shell/terminal application to navigate to the project's folder with ```cd csci-e-114-final-project-delpebricep```.

While in the project's directory, run ```npm install``` to install the project's NPM dependencies.


### Step 2: MongoDB Setup

**NOTE:** Teaching instructors may skip to Step 3, as they can use the .env file submitted through Canvas to handle MongoDB credentials.

In order for the leaderboard feature and Netlify functions to work locally, you will need to make a MongoDB database.
[Follow these instructions from the official MongoDB website](https://www.mongodb.com/basics/create-database) to set one up. I recommend making a free MongoDB Atlas account and hosting the database there so it can be up at all times.


### Step 3: Creating an Environment File

Create a .env file at the root directory of your cloned repository. Go to your MongoDB database and acquire its connection URI, its database name, and the name of the collection you would like to store user scores under. 

The .env file must look like the following:
```
MONGODB_URI="[MongoDB connection URI for your database goes here]"
MONGODB_DATABASE="[MongoDB database name goes here]"
MONGODB_COLLECTION="[MongoDB collection name goes here]"
```

**NOTE:** Teaching instructors may use the .env file submitted through Canvas instead. It contains the MongoDB database credentials I used throughout development of this project.


### Step 3: Running the Project

After completing the previous two steps, run ```npm start``` to run the project normally.
To run the project locally with Netlify functions enabled, install the Netlify CLI then run ```netlify dev``.


## Assignment Components and Requirements

### An "Extraordinary Distinction": Leaderboards with Serverless Functions 

I made use of Netlify's serverless functions to implement Quiz Land's leaderboard feature. The function allows users to query other players' high scores for a certain quiz, as well as submit their own scores. Player names and scores are stored on a MongoDB Atlas database.


## Credits

These are credits for of all the assets that I did not make, as well as a few programming resources that helped me implement certain features and address certain quirks.

### Programming Resources
- [How to Randomize and Shuffle an Javascript Array](https://www.tutorialspoint.com/How-to-randomize-shuffle-a-JavaScript-array), from TutorialsPoint
- [MongoDB and Netlify Serverless Functions](https://www.mongodb.com/developer/languages/javascript/developing-web-application-netlify-serverless-functions-mongodb/), from the MongoDB website
- [Using a Custom Webpack Loader with Gatsby](https://stackoverflow.com/questions/68162448/how-to-use-a-custom-webpack-loader-in-gatsby-js), from StackOverflow

### Music
- **[APM Music](https://www.apmmusic.com/)**
  - **"Bowler Hats"**, by David Farnon
  - **"'Er Indoors"**, by Johnny Hawksworth
  - **"Happy Tune"**, by Dieter Reith from _Good Ol' Hammond Organ_
  - **"Quiz Organ (A)"**, by Curtis Schwartz
  - **"Quiz Organ (B)"**, by Curtis Schwartz
  - **"Quiz Organ (C)"**, by Curtis Schwartz
  - **"Ramblin' Man From Gramblin'"**, by Sam Spence
  - **"Scene Ending"**, by Dieter Reith from _Good Ol' Hammond Organ_ 
- **[Incompetech](https://incompetech.com/)**
  - **"Acid Jazz"**, by Kevin MacLeod
  - **"Off to Osaka"**, by Kevin MacLeod
- **In-Game Music** from _Ms. Pac-Man: Quest for the Golden Maze_, by Composer Unknown (2001, Infogrames)
- **[Upright Music](https://search.upright-music.pl/)**
  - **"Carnival Time"**, by Brent Barkman, Carl Lenox, Peter Coulman, and Thomas David Thorney

### Sound Effects
- **[Freesound](https://www.freesound.org)**
	- adriann
	- xtrgamr
- **[Mixkit.co](https://mixkit.co/)**

### Others
- "Ubuntu" and "Source Code Pro" fonts were acquired from [Google Fonts](https://fonts.google.com/).
- As stated before, all trivia data was provided via [The Trivia API](https://the-trivia-api.com/).