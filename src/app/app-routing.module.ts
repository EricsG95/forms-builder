import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';

const routes: Routes = [
  { path: '', redirectTo: 'form-builder', pathMatch: 'full' },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form-preview', component: FormPreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
