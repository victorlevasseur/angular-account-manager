import {
  Component
} from '@angular/core';

import { EditableFieldComponentBase, editableFieldMetadata } from './editable-field-base.component';

import { TextFieldEditorComponent } from './editors/text-field-editor.component';
import { FieldRendererComponent } from './renderers/field-renderer.component';

import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

@Component(editableFieldMetadata('editable-text-field'))
export class EditableTextFieldComponent extends EditableFieldComponentBase<string> {
  constructor(
    renderersService: FieldRenderersFactoriesService,
    editorsService: FieldEditorsFactoriesService) {
    super(FieldRendererComponent, TextFieldEditorComponent, renderersService, editorsService);
  }
}
