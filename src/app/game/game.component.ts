import { Component, OnInit } from '@angular/core';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../services/game.service';
import { Game } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit {
  close = faPause;
  pause: boolean = false;
  difficult: string = this.gameServices.currentDifficut;
  movements: number =
    this.difficult === 'Easy' ? 500 : this.difficult === 'Medium' ? 100 : 50;

  partidasFinalizadas: any = localStorage.getItem('games');

  partidasPerdidas: any = [];

  partidasGanadas: any = [];

  constructor(
    private gameServices: GameService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onAttack(e: any) {
    let id = e.target.id,
      gameId = id.substring(1, 2),
      row = id.substring(2, 3),
      col = id.substring(3, 4),
      tile = this.gameServices.games[gameId].tiles[row][col];

    if (this.movements === 0) {
      this.toastr.success('You have no more moves', 'GAME OVER!');
      return;
    }

    if (tile.value == 'X') {
      return;
    }

    if (tile.value == 1) {
      this.toastr.success('Ship!', 'YESSS!');
      tile.state = 'sunken';
      this.aplicarSonido('explo');
    } else {
      tile.state = 'water';
      this.aplicarSonido('water');
    }

    this.movements--;
    this.gameServices.games[gameId].player.movements++;

    tile.used = true;
    tile.value = 'X';
  }

  aplicarSonido(audioString: string): void {
    const audio = new Audio();

    audio.src = '../../assets/audio/' + audioString + '.mp3';
    audio.load();
    audio.play();
  }

  initGame() {
    this.quitGame();
    this.gameServices.startGame();
  }

  pauseGame() {
    return (this.pause = true);
  }

  playGame() {
    return (this.pause = false);
  }

  quitGame() {
    console.log(this.gameServices.games )
    this.gameServices.games = [];
    this.pause = false;
    return;
  }

  get games(): Game[] {
    return this.gameServices.getGame();
  }

  get winner() {
    const winner = this.gameServices.games[0].tiles.map((tile) =>
      tile.filter((data: any) => data.value === 1)
    );
    const game = winner.filter((win) => win.length);

    let wonGame = {
      id: this.gameServices.createIdRandom(6),
      dayInit: this.gameServices.games[0].dayInit,
      hourInit: this.gameServices.games[0].hourInit,
      estadoFinal: 'Won',
      player: this.gameServices.games[0].player,
      difficult: this.gameServices.games[0].difficult,
    };

    if (!game.length) {
      this.partidasGanadas.push(wonGame);
      // localStorage.setItem();
      console.log(this.partidasGanadas);
    }
    return !game.length ? this.gameServices.games[0] : null;
  }

  get loser() {
    const winner = this.gameServices.games[0].tiles.map((tile) =>
      tile.filter((data: any) => data.value === 1)
    );

    const game = winner.filter((win) => win.length);

    let losedGame = {
      id: this.gameServices.createIdRandom(6),
      dayInit: this.gameServices.games[0].dayInit,
      hourInit: this.gameServices.games[0].hourInit,
      estadoFinal: 'Lost',
      player: this.gameServices.games[0].player,
      difficult: this.gameServices.games[0].difficult,
    };

    if (game.length && this.movements === 0) {
      this.partidasPerdidas.push(losedGame);

      console.log(this.partidasPerdidas);
    }
    //   localStorage.setItem(
    //     'games',
    //     JSON.stringify({
    //       ...this.partidasFinalizadas?.loseGames.push(losedGame),
    //     })
    //   );
    return game.length && this.movements === 0
      ? this.gameServices.games[0]
      : null;
  }
}
