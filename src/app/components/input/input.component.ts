import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../model/field.interface';
import { FieldConfig } from '../../model/field-config.interface';
import { Router } from '@angular/router';
import { EditorialServiceService } from '../../editorial-service.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;

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
}
