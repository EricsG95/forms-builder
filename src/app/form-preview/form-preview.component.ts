import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Location } from '@angular/common';

import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FieldConfig } from '../model/field-config.interface';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit, AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  paramsData: any;
  fullForm: FieldConfig[] = [];

  constructor(private cdr: ChangeDetectorRef, private location: Location) {}

  ngOnInit(): void {
    if (!!localStorage.getItem('lastBuiltForm')) {
      const paramsDataParsed = JSON.parse(
        localStorage.getItem('lastBuiltForm')
      );
      const submitButton: FieldConfig = {
        questionLabel: 'Submit',
        name: 'submit',
        controlType: 'button',
      };

      paramsDataParsed.push(submitButton);
      this.fullForm = paramsDataParsed;

      console.log('fullForm preview', this.fullForm);
    }
  }

  ngAfterViewInit(): void {
    console.log(
      'FormPreviewComponent -> ngOnInit -> this.form.valid',
      this.form.valid
    );

    if (this.form.valid) {
      this.form.setDisabled('submit', false);
    } else {
      this.form.setDisabled('submit', true);
    }

    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.cdr.detectChanges();
  }

  submit(value: { [name: string]: any }): void {
    console.log('From form preview: ', value);
  }

  goBack(): void {
    this.location.back();
  }
}
