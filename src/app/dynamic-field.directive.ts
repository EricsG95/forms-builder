import {
  Directive,
  Input,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  Type,
  ComponentRef,
  OnChanges,
} from '@angular/core';
import { FieldConfig } from './model/field-config.interface';
import { FormGroup } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { Field } from './model/field.interface';
import { ButtonComponent } from './components/button/button.component';
import { RadiobuttonComponent } from './components/radiobutton/radiobutton.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

const componentMapper: { [type: string]: Type<Field> } = {
  paragraph: InputComponent,
  radioButton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  button: ButtonComponent,
};
@Directive({
  selector: '[appDynamicField]',
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit(): void {
    const factoryComponent = this.resolver.resolveComponentFactory<Field>(
      componentMapper[this.config.controlType]
    );
    this.component = this.container.createComponent(factoryComponent);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
