import { Component, OnInit } from '@angular/core';
import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorialServiceService } from '../../editorial-service.service';

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

  public href = '/form-builder';
  isEditorMode = false;

  constructor(
    private router: Router,
    private editService: EditorialServiceService
  ) {}

  ngOnInit(): void {
    if (this.href === this.router.url) {
      this.isEditorMode = true;
    }
    this.radioControl.valueChanges.subscribe((value) => {
      if (value === '') {
        this.validateAllFormFields(this.group);
      }
    });
  }

  edit(): void {
    this.editService.updateState({
      state: 'EDIT',
      fieldConfig: this.config,
    });
  }

  delete(): void {
    this.editService.updateState({
      state: 'DELETE',
      fieldConfig: this.config,
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
