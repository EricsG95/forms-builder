import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

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
  get form() {
    return this.questionsBuilderForm.controls;
  }

  get questionsList() {
    return this.form.questions as FormArray;
  }

  get questions(): FormArray {
    return this.questionsBuilderForm.get('questions') as FormArray;
  }

  questionsBuilderForm = this.fb.group({
    questions: new FormArray([]),
  });

  controls: Control[] = [
    { value: 'textbox', viewValue: 'Paragraph' },
    { value: 'radioButton', viewValue: 'Radio Button List' },
    { value: 'checkbox', viewValue: 'Check Box List' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addQuestion();
  }

  addQuestion(): void {
    this.questionsList.push(
      this.fb.group({
        questionControlType: [''],
        questionLabel: [''],
        name: [''],
        validation: [''],
      })
    );
  }

  removeNewProdField(index: number): void {
    this.questionsList.removeAt(index);
  }

  onSubmit(): void {
    // TODO: Use EventEmitter with form value
    console.warn(this.questionsBuilderForm.value);
  }

  previewForm(): void {
    console.log('Preview form');
  }
}
