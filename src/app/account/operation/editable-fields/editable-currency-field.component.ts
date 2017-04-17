import {
  Component,
  Input
} from '@angular/core';

import { EditableFieldComponentBase, editableFieldMetadata } from './editable-field-base.component';

import { CurrencyFieldEditorComponent } from './editors/currency-field-editor.component';
import { CurrencyFieldRendererComponent } from './renderers/currency-field-renderer.component';

import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

import Big = require('big.js/big');

@Component(editableFieldMetadata('editable-currency-field'))
export class EditableCurrencyFieldComponent extends EditableFieldComponentBase<Big> {
  
  @Input('rcolorize')
  rcolorize: boolean = true;

  constructor(
    renderersService: FieldRenderersFactoriesService,
    editorsService: FieldEditorsFactoriesService) {
    super(CurrencyFieldRendererComponent, CurrencyFieldEditorComponent, renderersService, editorsService);
  }
}
