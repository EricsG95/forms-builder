interface Option {
  optionValue: string;
  isCommentToggled: string;
  optionComment: string;
}

export interface FieldConfig {
  disabled?: boolean;
  controlType: string;
  questionLabel?: string;
  name?: string;
  options?: Option[];
  isIncludingOtherOption?: boolean;
  isRequired?: boolean;
  value?: any;
}
