import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { Tab } from '../tabbedwindow/tab';
import { AccountTabComponent } from './account-tab.component';

export class AccountTab extends Tab {

  constructor(private filename: string) {
    super();
  };

  getTabTitle(): string {
    return this.filename;
  }

  createComponent(componentFactoryResolver: ComponentFactoryResolver, viewRef: ViewContainerRef) {
    // Chargement du composant qui va faire le rendu de la ligne de compte
    const factory = componentFactoryResolver.resolveComponentFactory(AccountTabComponent);
    const ref = viewRef.createComponent(factory, 0);
    ref.instance.filename = this.filename;
    ref.changeDetectorRef.detectChanges();
  }
}
