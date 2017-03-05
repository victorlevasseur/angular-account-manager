import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

export abstract class Tab {
  constructor() { };

  abstract getTabTitle(): string;

  abstract createComponent(componentFactoryResolver: ComponentFactoryResolver, viewRef: ViewContainerRef);
}
