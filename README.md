# Angular Battleship

This is a single player version of the traditional battleship game

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

To clone the project, you must execute the following line in the console:

git clone https://github.com/dgiannico19/angular-battleship.git

On the containing folder of the project:

Run `npm install` to install project dependencies

Run `ng serve -o` for a dev server. This will automatically take you `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


The game consists of 3 routes, /setup, /game, /rules

In the setup component, you can choose the level of difficulty(Hard - 50 moves, Medium - 100 moves, Easy - There is no movement limit), see the rules of the game and start playing.

In the rules component, you will see detailed the rules of the game.

In the game, you see a 10 x 10 board, in which the untouched squares are represented with anchor icons, the squares where there is a ship with a ship icon and the squares where there is water with the icon of a sea wave.

At any moment of the game you can pause and you will see a menu with two buttons, "continue" and "quit".

If you win or lose you will see a screen according to each case.

