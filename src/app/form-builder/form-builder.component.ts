import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

interface Control {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  // Single question
  newQuestionForm = this.fb.group({
    questionControlType: ['', Validators.required],
    questionLabel: ['', Validators.required],
    name: [this.generateUniqueId()],
    options: new FormArray([]),
    isIncludingOtherOption: [''],
    isRequired: [''],
  });

  // New question options for radio and checkbox
  get singleQuestionForm() {
    return this.newQuestionForm.controls;
  }

  get optionsList(): FormArray {
    return this.singleQuestionForm.options as FormArray;
  }

  get options(): FormArray {
    return this.newQuestionForm.get('options') as FormArray;
  }

  controls: Control[] = [
    { value: 'paragraph', viewValue: 'Paragraph' },
    { value: 'radioButton', viewValue: 'Radio Button List' },
    { value: 'checkbox', viewValue: 'Check Box List' },
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onQuestionTypeChanges();
    // this.addQuestion();
  }

  onQuestionTypeChanges(): void {
    const minOptions = 3;
    this.newQuestionForm
      .get('questionControlType')
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

  removeQuestionFromForm(index: number): void {
    // this.questionsList.removeAt(index);
  }

  addNewQuestionToForm(): void {
    console.warn(this.newQuestionForm.value);
  }

  previewForm(): void {
    console.log('Preview form');
  }

  generateUniqueId(length: number = 8): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log('FormBuilderComponent -> generateUniqueId -> result', result);
    return result;
  }
}
