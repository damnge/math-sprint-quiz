# Math Sprint Quiz

This is a project build as assigment for Vefskollin course.
For speciality guide I've chosen coding. I've decided to build a small math sprint quiz.

## Game Description and Functionality

This is a single page web application, that test on player simple math equations.  
Every equations is created from the random numbers up to 9, so there are not too complicated.  
Some of the equations are correct some of them are wrong.  
Player by clicking Wrong and Correct button select the answer.
The goal of the game is to have the best possible time. For every wrong answer there is 0.5 second penalty.  
The best score of the player are saved into Local Storage so whenever user come back to play again, user can see the best time.

### Onboarding Page

At the begninning User is taken through simple onboarding process.
User need to pass their Nickname into the form, then this name is stored in the Local Storage and everytime the user come back to the game app already remember Users name (unless local storage is cleared). If the name is not provided to the input the Alert message will be displayed.

### Splash Page

Second card so called splash page. Display the name of the User with simple into and 4 different radio inuput categories:

- 10 questions
- 25 questions
- 50 questions
- 99 questions

Player need to select on of the category and then they can press start game.

### Countdown Page

The coundown 3,2,1 GO! is displayed to the player so they have time to get ready.

### Main Game Page

On this page the equations are displayed to the user, the amount of them depends on the selected category.
Though some of those equations are correct and some of them are wrong.  
Player by clicking on Wrong or Correct button decides what their answer is.
After click an answer a blue selection stripe moves to next equations to highlight it to the Users so they can focus better on each equation.
When all the questions are answered game finishes

### Score Page

The last page where player can see their score.  
Player can see their:

- Base Time
- Penalty Time
- Final Time - that combines both Base Time and Penalty Time.

After one second the Play Again button is displayed and it take user back to the Splash Page where they can select category again.
If there time is better than before or it's first time the Best Score on the side of the each individual category will be displayed.

That's all logic behind the game. Descriptions and comments block by block you can find inside the script.js and index.html files.  
Feel free to play with the code and improve it! Thanks for your time, hope you hade fun!

PS. To make game a bit more complex and shuffle all equations (beetwen right and correct ones) I've used solution that I found on stackoverflow.
description with the link you can find here and inside shuffle.js file.
# math-sprint-quiz
