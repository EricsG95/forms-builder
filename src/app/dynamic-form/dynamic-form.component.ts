import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FieldConfig } from '../model/field-config.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input()
  fields: FieldConfig[] = [];

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get controls(): any {
    return this.fields.filter(
      ({ controlType: controlType }) => controlType !== 'button'
    );
  }
  get changes(): any {
    return this.form.valueChanges;
  }
  get valid(): any {
    return this.form.valid;
  }
  get value(): any {
    return this.form.value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createGroup();
  }

  ngOnChanges(): any {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const field = this.fields.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(field));
        });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createGroup(): any {
    const group = this.fb.group({});
    this.controls.forEach((control) =>
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: FieldConfig): any {
    const value = undefined;
    return this.fb.control(value, this.bindValidations(config.isRequired));
  }

  bindValidations(isRequired: boolean): Validators {
    if (isRequired) {
      return Validators.required;
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  setDisabled(name: string, disable: boolean): any {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.fields = this.fields.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any): void {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}
