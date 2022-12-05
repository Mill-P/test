import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  VeryCool: number = 0;

  question1From!: FormGroup;
  question2From!: FormGroup;

  isLoading: boolean = false;
  result: number = 0;

  ngOnInit() {
    this.question1From = new FormGroup({
      R: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(105),
      ]),
      K: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
    });

    this.question2From = new FormGroup({
      Numbers: new FormControl('', [Validators.required]),
      Array: new FormControl('', [Validators.required]),
    });
  }

  get K() {
    return this.question1From.get('K');
  }
  get R() {
    return this.question1From.get('R');
  }

  ok() {
    this.isLoading = true;
    let nums = this.question2From.value.Numbers.split(' ').map(Number);
    //N denoting the number of players
    let players = Array.from({ length: nums[0] }, (_, i) => i + 1);
    //M denoting the number of passes
    let passes = nums[1];
    //X denoting the position of ThunderCracker
    let X = nums[2] - 1;
    //Y denoting the position of MunKee
    let Y = nums[3] - 1;
    let A = this.question2From.value.Array.split(' ').map(Number);
    let allPaths: number[][] = [];

    for (let i = 0; i < passes; i++) {
      let path: number[] = [];
      if (allPaths.length == 0) {
        path = this.findAllPossiblePathsFromPos(X, A[i], players);

        for (let o = 0; o < path.length; o++) {
          allPaths.push([players[X], path[o]]);
        }
      } else {
        for (let j = 0; j < allPaths.length; j++) {
          if (allPaths[j].length == i + 2) {
            break;
          }
          let pos = players.indexOf(allPaths[j][allPaths[j].length - 1]);
          path = this.findAllPossiblePathsFromPos(pos, A[i], players);

          for (let k = 0; k < path.length; k++) {
            let copyPath: number[] = [...allPaths[j]];
            copyPath.push(path[k]);
            allPaths.push(copyPath);
          }
          allPaths.splice(j, 1);
          j--;
        }
      }
    }
    let filteredPaths: number[][] = allPaths.filter(
      (x) => x[x.length - 1] == players[Y]
    );
    this.result = filteredPaths.length;
    this.isLoading = false;
  }

  findAllPossiblePathsFromPos(
    pos: number,
    currentPassPower: number,
    players: number[]
  ): number[] {
    let ret: number[] = [];
    for (let i = 0; i <= currentPassPower; i++) {
      if (pos - i >= 0 && players[pos - i] != players[pos]) {
        if (!ret.includes(players[pos - i])) {
          ret.push(players[pos - i]);
        }
      }
      if (pos + i <= players.length - 1 && players[pos + i] != players[pos]) {
        if (!ret.includes(players[pos + i])) {
          ret.push(players[pos + i]);
        }
      }
    }
    return ret;
  }

  calculate() {
    this.VeryCool = 0;
    let K = this.question1From.value.K;
    let R = this.question1From.value.R;

    for (let i = 1; i <= R; i++) {
      let binary = this.dec2bin(i);
      let occ = this.occurrences(binary, '101', true);
      if (occ >= K) {
        this.VeryCool++;
      }
    }
  }

  occurrences(
    string: string,
    subString: string,
    allowOverlapping: boolean
  ): number {
    string += '';
    subString += '';
    if (subString.length <= 0) return string.length + 1;

    let n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }

  dec2bin(dec: number): string {
    return (dec >>> 0).toString(2);
  }
}
