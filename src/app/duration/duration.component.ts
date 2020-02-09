import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DurationComponent,
      multi: true,
    },
  ]
})
export class DurationComponent implements OnInit, ControlValueAccessor {

  form: FormGroup;

  constructor(private fb: FormBuilder, private renderer2: Renderer2, private elementRef: ElementRef) {
  }

  @Input() value: number;

  get hours() {
    return this.form.controls.hours.value;
  }

  get minutes() {
    return this.form.controls.minutes.value;
  }

  get seconds() {
    return this.form.controls.seconds.value;
  }

  ngOnInit() {
    this.form = this.fb.group({
        hours: this.fb.control(0, []),
        minutes: this.fb.control(0, []),
        seconds: this.fb.control(0, [])
      }
    );
    this.form.valueChanges.subscribe(this.calculateTime.bind(this));
  }

  onChange: any = () => {};

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer2.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  changeField($event: Event, element) {
    $event.preventDefault();
  }

  calculateTime({hours = 0, minutes = 0, seconds = 0}) {
    const calcTime = hours * 3600 + minutes * 60 + seconds;
    this.onChange(calcTime);
  }
}
