import { Component, OnInit } from '@angular/core';
import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
})
export class RadiobuttonComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;

  customOtherOption = '';

  get radioControl(): FormControl {
    return this.group.get(this.config.name) as FormControl;
  }

  ngOnInit(): void {
    this.radioControl.valueChanges.subscribe((value) => {
      if (value === '') {
        this.validateAllFormFields(this.group);
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  clearValidation(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsPristine();
    });
  }

  bindValidations(isRequired: boolean): Validators {
    if (isRequired) {
      return Validators.required;
    } else {
      return null;
    }
  }
}
