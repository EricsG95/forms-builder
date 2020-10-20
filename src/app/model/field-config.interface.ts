export interface FieldConfig {
  disabled?: boolean;
  controlType: string;
  questionLabel?: string;
  name?: string;
  options?: string[];
  isIncludingOtherOption?: boolean;
  isRequired?: boolean;
  value?: any;
}
