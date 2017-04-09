import {
  Injectable,
  Type,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';

import { FieldRendererComponent } from './field-renderer.component';

@Injectable()
export class FieldRenderersFactoriesService {
  private factories = new Map<Type<FieldRendererComponent<any>>, ComponentFactory<FieldRendererComponent<any>>>();

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  getFactory(renderer: Type<FieldRendererComponent<any>>): ComponentFactory<FieldRendererComponent<any>> {
    if(!this.factories.has(renderer)) {
      this.factories.set(renderer, this.componentFactoryResolver.resolveComponentFactory(renderer));
    }
    return this.factories.get(renderer);
  }
}
