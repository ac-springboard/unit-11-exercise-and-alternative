# unit-11-exercise-and-alternative

This repository contains two projects named **Connect Four** and **ConnecThem!**, respectively, as the result of the Unit 11 of the **Software Engineering Career Track course**, at **[Springboard.com](springboard.com)**, from a pre-existing code.

Both projects were developed in the following dev environment:

* Intellij-IDEA 2020.2;
* Ubuntu 20.04 (focal);
* i3 version 4.17.1
* Pure JavaScript/ES6, CSS3, and HTML3, with no added libs.`

To run any of the projects first clone the repo:

`$ git clone https://github.com/ac-springboard/unit-11-exercise-and-alternative`


### Connect Four ###

* This project contains the solved exercise of the Unit 11, as requested on its statement.
* It's found in the directory `connect-four`.
* It can be executed from the command-line from the following command line (_Note: there are many other ways to run it_):

```
$ cd connect-four
$ http-server -o index.html
```

This is the screenshot of the **Connect Four**:

![Connect Four](/screenshots/connect-four.png)

### ConnecThem! ###

* This project is an attempt to create a Connect4 game from scratch, from its rules.
* There are two main objectives to be achieved during its development:
  1. Practice and identify how an actual game development would be developed in the real-world;\
  2. Use this development as a laboratory to learn and test program techniques, advanced features (eg, Classes, Closures, Animations), etc.
* As consequences of the above, some parts of the code can be inconsistent others, some optimizations should be done, and so on.
* For example, the current project's **TODO List** includes:
```
Targets
    Occurrences of 'TODO:' in Project
Found Occurrences  (32 usages found)
    Production  (32 usages found)
        exercise-and-alternative  (32 usages found)
            connect-four  (13 usages found)
                connect4.css  (2 usages found)
                    12 /* TODO: [DONE] make into circles */
                    19 /* TODO: [DONE] make pieces red/blue,  depending on player 1/2 piece */
                connect4.js  (11 usages found)
                    19 // TODO: [DONE] set "board" to empty HEIGHT x WIDTH matrix array
                    30 // TODO: [DONE] get "htmlBoard" variable from the item in HTML w/ID of "board"
                    33 // TODO: [DONE] add comment for this code
                    53 // TODO: [DONE] add comment for this code
                    75 // TODO: write the real version of this, rather than always returning 0
                    87 // TODO: [DONE] make a div and insert into correct table cell
                    97 // TODO: [DONE] pop up alert message
                    114 // TODO: [DONE] add line to update in-memory board
                    124 // TODO: [DONE] check if all cells in board are filled; if so call, call endGame
                    131 // TODO: [DONE] switch currPlayer 1 <-> 2
                    153 // TODO: read and understand this code. Add comments to help you.
            connect-them/src  (2 usages found)
                utils.js  (2 usages found)
                    10 // TODO: Create an independent object to treat sounds
                    70 // TODO: ADD THE EXPLANATION ABOUT THE CONDITIONS
            connect-them/src/l1view  (12 usages found)
                connect-them.css  (2 usages found)
                    11 /* TODO: Optimize the whole css */
                    12 /* TODO: Make all sizes dynamic (width, height, font, etc. )*/
                mapper.js  (6 usages found)
                    6 // TODO: Create a separate class for the mapping of rows, cols, and diagonals. It can be an independent object.
                    7 // TODO: Place the player's names in separate positions on the screen
                    41 // TODO: The sounds could be obtained from the (future) Class that treat the sounds.
                    50 // TODO: Create an independent object to treat the sounds. Make is reusable by other applications.
                    305 // TODO: Set default volume in a config file
                    308 // TODO: Highlight the winner cells
                welcome.js  (4 usages found)
                    3 // TODO: This should be a class!
                    11 // TODO: Set default volume in a config file
                    14 // TODO: Get these data from Mapper (?)
                    15 // TODO: Play against the computer
            connect-them/src/l1view/css  (1 usage found)
                main.css  (1 usage found)
                    14 /* TODO: Make all sizes dynamic (width, height, font, etc. )*/
            connect-them/src/l2controller  (2 usages found)
                controller.js  (2 usages found)
                    5 // TODO: This file doesn't make sense in the way it is. The application needs architecture improvements.
                    6 // TODO: Documentation
            connect-them/src/l3model  (2 usages found)
                init.js  (2 usages found)
                    15 // TODO: back to the Welcome Page
                    19 // TODO: HOW IS THIS VAR USED?

```
* Before running it, we recommend enabling sounds for the urls `http://localhost` and `http://127.0.0.1` on your browser, for a better experience.
* To run the project the following commands can be used:

```
$ cd connect-them
$ http-server -o src/l1view/connect-them.html
```

* The following page is shown:

![ConnecThem! Welcome!](/screenshots/connect-them-welcome.png)

* The arrow keys can be used to change the default values.
* By clicking on the **Go!** button the "play room' is shown and the game is ready to start:

![ConnecThem! Play-Room](/screenshots/connect-them-playing.png)

### Enjoy! ###

######_Constructive comments and feedbacks are very welcome! In case of issues, please use the project's `Issues` tab, if possible._######
 
### Thank yoy! ###


