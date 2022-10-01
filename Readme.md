# Math Sprint Quiz

This is a project built for Vefskollin course.
For the speciality guide, I've chosen coding. I've decided to build a small math sprint quiz.

## Game Description and Functionality

This is a single-page web application, that shows the players simple math equations.  
Every equation is created from random numbers up to 9, so there are not too complicated.  
Some of the equations are correct some of them are wrong.  
Players by clicking the Wrong and Correct buttons select the answer.
The goal of the game is to have the best possible time. For every wrong answer, there is a 0.5-second penalty.  
The best score of the player is saved into Local Storage so whenever the user comes back to play again, the user can see the best time.  

### Onboarding Page

In the beginning, the User is taken through a simple onboarding process.
User needs to pass their Nickname into the form, then this name is stored in the Local Storage and every time the user comes back to the game app already remember the Users name (unless local storage is cleared). If the name is not provided to the input the Alert message will be displayed.


### Splash Page

Second card so-called splash page. Display the name of the User with a simple intro and 4 different radio input categories:
* 10 questions
* 25 questions
* 50 questions
* 99 questions

Players need to select one of the categories and then they can press start game.

### Countdown Page

The countdown 3,2,1 GO! is displayed to the player so they have time to get ready.

### Main Game Page

On this page the equations are displayed to the user, the amount of them depends on the selected category.
Though some of those equations are correct and some of them are wrong.  
Player by clicking on the Wrong or Correct button decides what their answer is.
After clicking an answer a blue selection stripe moves to the next equation to highlight it to the Users so they can focus better on each equation.
When all the questions are answered game finishes

### Score Page

The last page is where players can see their scores.  
The Users can see their:
* Base Time
* Penalty Time
* Final Time - that combines both Base Time and Penalty Time.

After one second the Play Again button is displayed and it takes the User back to the Splash Page where they can select the category again.
If their time is better than before or it's the first time the Best Score on the side of each individual category will be displayed.

That's all logic behind the game. Descriptions and comments block by block you can find inside the script.js and index.html files.  
Feel free to play with the code and improve it! Thanks for your time, hope you had fun!

PS. To make the game a bit more complex and shuffle all equations (between right and correct ones) I've used the solution that I found on StackOverflow.
description with the link you can find here and inside the shuffle.js file.  
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

