import { Component } from '@angular/core';
import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
})
export class RadiobuttonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  customOtherOption = '';

  // onStandardChanged($event): void {
  //   console.log('RadiobuttonComponent -> $event', $event.value);

  //   this.customOtherOption = '';
  // }

  // onCustomChanged($event): void {
  //   console.log('RadiobuttonComponent -> $event', $event.value);

  //   console.log(
  //     'RadiobuttonComponent -> customOtherOption',
  //     this.customOtherOption
  //   );
  // }
}
