import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
  VeryCool: number = 0;

  question1From!: FormGroup;
  question2From!: FormGroup;

  ngOnInit()
  {
    this.question1From = new FormGroup({
      R: new FormControl('', [Validators.required, Validators.min(1), Validators.max(105)]),
      K: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    });

    this.question2From = new FormGroup({
      Numbers: new FormControl('', [Validators.required]),
      Array: new FormControl('', [Validators.required]),
    });
  }

  
  get K() { return this.question1From.get('K'); }
  get R() { return this.question1From.get('R'); }

  ok()
  {
    let nums = this.question2From.value.Numbers.split(' ').map(Number);
    let N = nums[0];
    let M = nums[1];
    let X = nums[2];
    let Y = nums[3];
    let Array = this.question2From.value.Array.split(' ').map(Number);
    console.log(N, M, X, Y);
    console.log(Array);
  }

  calculate()
  {
    this.VeryCool = 0;
    let K = this.question1From.value.K;
    let R = this.question1From.value.R;

    for (let i = 1; i <= R; i++)
    {
      let binary = this.dec2bin(i);
      let occ = this.occurrences(binary, '101', true);
      if(occ >= K)
      {
        this.VeryCool++;
      }
    }
  }

  occurrences(string: string, subString: string, allowOverlapping: boolean): number 
  {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

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

  dec2bin(dec: number): string
  {
    return (dec >>> 0).toString(2);
  }
}
