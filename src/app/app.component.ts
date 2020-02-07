import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'duration';
  duration: FormControl;
  durValue = 0;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.duration = this.fb.control(0);
    this.duration.valueChanges.pipe(
      tap(value => {
        console.log(value);
      })
    ).subscribe();
  }

  dureationChange(data: any) {
    console.log(data);
  }
}
