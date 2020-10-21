import { Component } from '@angular/core';
import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EditorialServiceService } from '../../editorial-service.service';

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

  customOtherOption = '';

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

  onChangeOther($event): void {
    const checks = (this.group.get(this.config.name) as FormArray) as FormArray;

    if ($event.checked) {
      checks.push(new FormControl(this.customOtherOption));
    } else {
      const i = checks.controls.findIndex(
        (x) => x.value === this.customOtherOption
      );
      checks.removeAt(i);
    }
  }
}
