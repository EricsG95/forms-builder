import { Component } from '@angular/core';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup } from '@angular/forms';
import { Field } from '../../model/field.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
