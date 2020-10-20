import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { QuestionType } from '../model/question-type.interface';
import { FieldConfig } from '../model/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynaForm: DynamicFormComponent;

  // To be composed form
  fullForm: FieldConfig[] = [];

  // Single question
  newQuestionForm = this.fb.group({
    controlType: ['', Validators.required],
    questionLabel: ['', Validators.required],
    name: ['question-id-' + this.generateUniqueId()],
    options: new FormArray([]),
    isIncludingOtherOption: [''],
    isRequired: [''],
  });

  // New question options for radio and checkbox
  get singleQuestionForm(): any {
    return this.newQuestionForm.controls;
  }

  get optionsList(): FormArray {
    return this.singleQuestionForm.options as FormArray;
  }

  get options(): FormArray {
    return this.newQuestionForm.get('options') as FormArray;
  }

  questionTypes: QuestionType[] = [
    { value: 'paragraph', viewValue: 'Paragraph' },
    { value: 'radioButton', viewValue: 'Radio Button List' },
    { value: 'checkbox', viewValue: 'Check Box List' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    if (!!localStorage.getItem('lastBuiltForm')) {
      this.fullForm = JSON.parse(localStorage.getItem('lastBuiltForm'));
    }
    this.onQuestionTypeChanges();
  }

  onQuestionTypeChanges(): void {
    const minOptions = 3;
    this.newQuestionForm
      .get('controlType')
      .valueChanges.subscribe((selectedControlType) => {
        if (
          (selectedControlType === 'radioButton' ||
            selectedControlType === 'checkbox') &&
          this.optionsList.length === 0
        ) {
          for (let i = 0; i < minOptions; i++) {
            this.addOptions();
          }
        } else if (
          selectedControlType === 'paragraph' &&
          this.optionsList.length !== 0
        ) {
          this.optionsList.clear();
        }
      });
  }

  // Push 3 options to the new question
  addOptions(): void {
    this.optionsList.push(
      this.fb.group({
        optionValue: ['', Validators.required],
        isCommentToggled: [''],
        optionComment: [''],
      })
    );
  }

  onOptionCommentToggledChanges(option: FormGroup): void {
    option.get('optionComment').setValidators([Validators.required]);
    option.get('optionComment').updateValueAndValidity();
  }

  addNewQuestionToForm(): void {
    console.log(this.newQuestionForm.value);

    this.fullForm.push(this.newQuestionForm.value);
    this.resetNewQuestionForm();
    console.log('this.fullForm', this.fullForm);
  }

  resetNewQuestionForm(): void {
    this.newQuestionForm.reset();
    this.newQuestionForm
      .get('name')
      .setValue('question-id-' + this.generateUniqueId());
  }

  removeQuestionFromForm(): void {
    // this.questionsList.removeAt(index);
  }

  goToPreviewForm(): void {
    localStorage.setItem('lastBuiltForm', JSON.stringify(this.fullForm));
    this.router.navigate(['/form-preview']);
  }

  generateUniqueId(length: number = 11): string {
    let uniqueId = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      uniqueId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uniqueId;
  }
}
