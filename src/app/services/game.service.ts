import { Injectable } from '@angular/core';
import { Game } from '../game/game';

export interface Tiles {
  used: boolean;
  value: number;
  state: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  playerId: number = 1;
  games: Game[] = [];
  finishedGames: any = localStorage.getItem('games');
  difficultList: string[] = ['Easy', 'Medium', 'Hard'];
  currentDifficut: string = 'Easy';

  constructor() {}

  startGame() {
    if (!this.games.length) this.initGame();
  }

  getNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getGame(): Game[] {
    return this.games;
  }

  //crea tablero con el objeto q representa los casilleros y el jugador, distribuye 10 barcos simples entre los casilleros y agrega el juego al arreglo 
  initGame(): GameService {
    let tiles: Tiles[][] = [];

    for (let i = 0; i < 10; i++) {
      tiles[i] = [];

      for (let j = 0; j < 10; j++) {
        tiles[i][j] = { used: false, value: 0, state: '' };
      }
    }

  
    //distribuir barcos individuales
    for (let i = 0; i < 10 * 2; i++) {
      tiles = this.randomShips(tiles, 10);
    }

    //crear tablero con player
    let newGame = new Game({
      player: { id: this.createIdRandom(6), name: 'Player', movements: 0 },
      tiles: tiles,
    });

    this.games.push(newGame);

    return this;
  }

  //crea id random en base a una medida numerica lo utilice en player y id del juego
  createIdRandom = (length: number) => {
    let result = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++)
      result += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );

    return result;
  };

  // reparte los barcos de manera rndom por los casilleros del tablero
  randomShips(tiles: Tiles[][], len: number): Tiles[][] {
    len = len - 1;
    let ranRow = this.getNumber(0, len),
      ranCol = this.getNumber(0, len);

    if (tiles[ranRow][ranCol].value == 1) {
      return this.randomShips(tiles, len);
    } else {
      tiles[ranRow][ranCol].value = 1;
      return tiles;
    }
  }
}
