import { Component } from '@angular/core';
import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements Field {
  config: FieldConfig;
  group: FormGroup;

  checks: any = [];
  selected: any;

  onChange($event): void {
    const checks = (this.group.get(this.config.name) as FormArray) as FormArray;

    if ($event.checked) {
      checks.push(new FormControl($event.source.value));
    } else {
      const i = checks.controls.findIndex(
        (x) => x.value === $event.source.value
      );
      checks.removeAt(i);
    }
  }
}
