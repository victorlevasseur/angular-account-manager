import {
  Component,
  Input
} from '@angular/core';

import { EditableFieldComponentBase, editableFieldMetadata } from './editable-field-base.component';

import { ComboboxFieldEditorComponent } from './editors/combobox-field-editor.component';
import { FieldRendererComponent } from './renderers/field-renderer.component';

import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

import { ComboboxItem } from '../../../tools/comboboxitem';

@Component(editableFieldMetadata('editable-text-combobox-field'))
export class EditableTextComboboxFieldComponent extends EditableFieldComponentBase<string> {

  @Input("echoices")
  echoices: Array<ComboboxItem>;

  constructor(
    renderersService: FieldRenderersFactoriesService,
    editorsService: FieldEditorsFactoriesService) {
    super(FieldRendererComponent, ComboboxFieldEditorComponent, renderersService, editorsService);
  }
}
