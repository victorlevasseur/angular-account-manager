import {
  Injectable,
  Type,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';

import { FieldEditorBase } from './field-editor-base';

@Injectable()
export class FieldEditorsFactoriesService {
  private factories = new Map<Type<FieldEditorBase<any>>, ComponentFactory<FieldEditorBase<any>>>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  getFactory(editor: Type<FieldEditorBase<any>>): ComponentFactory<FieldEditorBase<any>> {
    if(!this.factories.has(editor)) {
      this.factories.set(editor, this.componentFactoryResolver.resolveComponentFactory(editor));
    }
    return this.factories.get(editor);
  }
}
