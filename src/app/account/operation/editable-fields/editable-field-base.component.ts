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
  SimpleChanges,
  SimpleChange
} from '@angular/core';

import { FieldEditorBase } from './editors/field-editor-base';
import { FieldEditorsFactoriesService } from './editors/field-editors-factories.service';
import { FieldRendererComponent } from './renderers/field-renderer.component';
import { FieldRenderersFactoriesService } from './renderers/field-renderers-factories.service';

export let editableFieldMetadata = (selector: string) => { return {
    selector: selector,
    template: `
      <div class="editable-field-container" (keypress)="onKeyPress($event);">
        <div class="editable-field-display" [hidden]="isEditing()" (dblclick)='startEditing();'>
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

  @Input()
  disabled = false;

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

  ngAfterViewInit() {
    this.renderer = this.rendererContainer.createComponent(this.renderersService.getFactory(this.rendererType));
    this.renderer.instance.value = this.value; // Not a real angular binding, we will have to update the value ourselves
    this.initCustomRendererInputs();
    this.renderer.changeDetectorRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    for(let changedProperty in changes) {
      let change = changes[changedProperty];
      if(changedProperty === 'value') {
        // As the renderers input are set when created (not by an angular binding, we need to manually update it)
        this.updateRendererValue();
      }
      else if(changedProperty === 'disabled') {
        if(change.currentValue) {
          this.stopEditing(); // Stop editing if disabled is set to true
        }
      }
      else if(this.renderer && changedProperty.substr(0, 1) === 'r') {
        this.updateCustomRendererInput(changedProperty, change);
      }
      else if(this.editor && changedProperty.substr(0, 1) === 'e') {
        this.updateCustomEditorInput(changedProperty, change);
      }
    }
  }

  onKeyPress(keyEvent: KeyboardEvent) {
    if(keyEvent.key === 'Enter') {
      if(this.isEditing() && this.editor.instance.closesOnEnter()) {
        this.stopEditing();
      }
    }
  }

  private initCustomRendererInputs() {
    for(let unprefixedInputName of this.renderer.instance.getCustomInputs()) {
      let inputName = 'r' + unprefixedInputName;
      if(inputName in this) {
        this.renderer.instance[unprefixedInputName] = this[inputName];
      }
    }
  }

  private updateCustomRendererInput(inputName: string, change: SimpleChange) {
    let unprefixedInputName = inputName.substr(1, 0);
    if(this.renderer.instance.getCustomInputs().indexOf(unprefixedInputName) !== -1) {
      this.renderer.instance[unprefixedInputName] = change.currentValue;
      this.renderer.changeDetectorRef.markForCheck();
    }
  }

  private initCustomEditorInputs() {
    for(let unprefixedInputName of this.editor.instance.getCustomInputs()) {
      let inputName = 'e' + unprefixedInputName;
      if(inputName in this) {
        this.editor.instance[unprefixedInputName] = this[inputName];
      }
    }
  }

  private updateCustomEditorInput(inputName: string, change: SimpleChange) {
    let unprefixedInputName = inputName.substr(1, 0);
    if(this.editor.instance.getCustomInputs().indexOf(unprefixedInputName) !== -1) {
      this.editor.instance[unprefixedInputName] = change.currentValue;
      this.editor.changeDetectorRef.markForCheck();
    }
  }

  private startEditing() {
    if(this.disabled) {
      return;
    }
    if(this.editor) {
      this.stopEditing();
    }
    this.editor = this.editorContainer.createComponent(this.editorsService.getFactory(this.editorType));
    this.editor.instance.value = this.value;
    this.editor.instance.valueChange.subscribe((newValue: T) => {
      this.valueChange.emit(newValue);
      this.updateRendererValue(); // The renderer is not binded with a real @Input, so need to mark it for change
    });
    this.initCustomEditorInputs();
    this.editor.instance.close.subscribe(() => this.stopEditing());
  }

  private isEditing(): boolean {
    return this.editor != null;
  }

  private stopEditing() {
    if(!this.editor) {
      return;
    }
    this.editorContainer.clear();
    this.editor = null;
  }

  private updateRendererValue() {
    if(this.renderer) {
      this.renderer.instance.value = this.value;
      this.renderer.changeDetectorRef.markForCheck();
    }
  }
}
