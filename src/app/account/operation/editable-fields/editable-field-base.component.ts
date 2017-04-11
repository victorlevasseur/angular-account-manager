import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Type,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { FieldEditorBase } from './editors/field-editor-base';
import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRendererComponent } from './renderers/field-renderer.component';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

export let editableFieldMetadata = (selector: string) => { return {
    selector: selector,
    template: `
      <div class="editable-field-container">
        <div class="editable-field-display" [hidden]="isEdited()" (dblclick)='startEditing();'>
          <div #renderer></div>
        </div>
        <div #editor></div>
      </div>
      `,
    styleUrls: ['editable-fields.style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
};
// Notes: no *ngIf on editable-field-display so that the dynamically created component is not destroyed

export class EditableFieldComponentBase<T> implements AfterViewInit, OnChanges {
  @Input()
  value: T;

  @Output()
  valueChange = new EventEmitter<T>();

  @ViewChild('renderer', {read: ViewContainerRef})
  private rendererContainer: ViewContainerRef;

  private renderer: ComponentRef<FieldRendererComponent<T>> = null;

  @ViewChild('editor', {read: ViewContainerRef})
  private editorContainer: ViewContainerRef;

  private editor: ComponentRef<FieldEditorBase<T>> = null;

  constructor(
    private rendererType: Type<FieldRendererComponent<T>>,
    private editorType: Type<FieldEditorBase<T>>,
    private renderersService: FieldRenderersFactoriesService,
    private editorsService: FieldEditorsFactoriesService) {

  }

  isEdited(): boolean {
    return this.editor != null;
  }

  ngAfterViewInit() {
    this.renderer = this.rendererContainer.createComponent(this.renderersService.getFactory(this.rendererType));
    this.renderer.instance.value = this.value; // Not a real angular binding, we will have to update the value ourselves
    this.renderer.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    // As the renderers input are set when created (not by an angular binding, we need to manually update it)
    if(changes.hasOwnProperty('value') && changes['value']) {
      this.updateRenderer();
    }
  }

  private startEditing() {
    if(this.editor) {
      this.stopEditing();
    }
    this.editor = this.editorContainer.createComponent(this.editorsService.getFactory(this.editorType));
    this.editor.instance.value = this.value;
    this.editor.instance.valueChange.subscribe((newValue: T) => {
      this.valueChange.emit(newValue);
      this.updateRenderer(); // The renderer is not binded with a real @Input, so need to mark it for change
    });
    this.editor.instance.close.subscribe(() => this.stopEditing());
  }

  private stopEditing() {
    if(!this.editor) {
      return;
    }
    this.editorContainer.clear();
    this.editor = null;
  }

  private updateRenderer() {
    if(this.renderer) {
      this.renderer.instance.value = this.value;
      this.renderer.changeDetectorRef.markForCheck();
    }
  }
}
