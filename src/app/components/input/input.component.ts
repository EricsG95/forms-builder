import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
