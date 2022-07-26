import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-finished-games',
  templateUrl: './finished-games.component.html',
  styleUrls: ['./finished-games.component.sass'],
})
export class FinishedGamesComponent implements OnInit {
  perdidos: any = [];

  constructor(private gameServices: GameService) {}

  ngOnInit(): void {
    // this.getLocal();
  }

  // getLocal() {
  //   console.log(
  //     Object.values(JSON.parse(this.gameServices.finishedGames).loseGames)
  //   );
  // }

  get finishedGames(): Object[] {
    return Object.values(JSON.parse(this.gameServices.finishedGames));
  }

  get lostGames(): Object[] {
    this.perdidos = Object.values(
      JSON.parse(this.gameServices.finishedGames).loseGames
    );

    return this.perdidos;
  }
}
