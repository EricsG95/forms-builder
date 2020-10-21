import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FieldConfig } from './model/field-config.interface';

interface EditingState {
  state: string;
  fieldConfig: FieldConfig;
}
@Injectable({
  providedIn: 'root',
})
export class EditorialServiceService {
  initialState: EditingState = {
    state: '',
    fieldConfig: undefined,
  };

  private messageSource: BehaviorSubject<EditingState> = new BehaviorSubject(
    this.initialState
  );

  editingState = this.messageSource.asObservable();

  updateState(editingState: EditingState): void {
    this.messageSource.next(editingState);
  }
}
