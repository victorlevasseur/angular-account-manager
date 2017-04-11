import {
  Component
} from '@angular/core';

import { EditableFieldComponentBase, editableFieldMetadata } from './editable-field-base.component';

import { DateFieldEditorComponent } from './editors/date-field-editor.component';
import { DateFieldRendererComponent } from './renderers/date-field-renderer.component';

import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

import * as moment from 'moment';

@Component(editableFieldMetadata('editable-date-field'))
export class EditableDateFieldComponent extends EditableFieldComponentBase<moment.Moment> {
  constructor(
    renderersService: FieldRenderersFactoriesService,
    editorsService: FieldEditorsFactoriesService) {
    super(DateFieldRendererComponent, DateFieldEditorComponent, renderersService, editorsService);
  }
}
