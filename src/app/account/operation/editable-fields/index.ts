import {
  Type
} from '@angular/core';

import { ComboboxFieldEditorComponent } from './editors/combobox-field-editor.component';
import { CurrencyFieldEditorComponent } from './editors/currency-field-editor.component';
import { DateFieldEditorComponent } from './editors/date-field-editor.component';
import { TextFieldEditorComponent } from './editors/text-field-editor.component';

import { CurrencyFieldRendererComponent } from './renderers/currency-field-renderer.component';
import { DateFieldRendererComponent } from './renderers/date-field-renderer.component';
import { FieldRendererComponent } from './renderers/field-renderer.component';

import { EditableCurrencyFieldComponent } from './editable-currency-field.component';
import { EditableDateFieldComponent } from './editable-date-field.component';
import { EditableTextFieldComponent } from './editable-text-field.component';
import { EditableTextComboboxFieldComponent } from './editable-text-combobox-field.component';

import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

export let entryComponents: Type<any>[] = [
  ComboboxFieldEditorComponent,
  CurrencyFieldEditorComponent,
  DateFieldEditorComponent,
  TextFieldEditorComponent,
  CurrencyFieldRendererComponent,
  DateFieldRendererComponent,
  FieldRendererComponent
];

export let components: Type<any>[]  = [
  EditableCurrencyFieldComponent,
  EditableDateFieldComponent,
  EditableTextFieldComponent,
  EditableTextComboboxFieldComponent
].concat(entryComponents);

export let globalProviders: Type<any>[] = [
  FieldEditorsFactoriesService,
  FieldRenderersFactoriesService
];
