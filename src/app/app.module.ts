import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormBuilder } from '@angular/forms';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    FormPreviewComponent,
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    CheckboxComponent,
    RadiobuttonComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    MatToolbarModule,
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent],
})
export class AppModule {}
