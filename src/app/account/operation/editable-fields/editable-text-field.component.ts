import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';

import { FieldEditorBase } from './field-editor-base';
import { FieldEditorsFactoriesService } from './field-editors-factories.service';
import { TextFieldEditorComponent } from './text-field-editor.component';

@Component({
  selector: 'editable-text-field',
  template: `
    <div class="editable-field-container">
      <div class="editable-field-display" *ngIf="!isEdited()" (dblclick)='startEditing();'>{{value}}</div>
      <div #editor></div>
    </div>
    `,
  styleUrls: ['editable-fields.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableTextFieldComponent {
  @Input()
  value: string;

  @Output()
  valueChange = new EventEmitter<string>();

  aaa: any = null;

  @ViewChild('editor', {read: ViewContainerRef})
  private editorContainer: ViewContainerRef;

  private editor: ComponentRef<FieldEditorBase<string>> = null;

  constructor(private factoryService: FieldEditorsFactoriesService) {

  }

  isEdited(): boolean {
    return this.editor != null;
  }

  ngOnInit() {
    console.log(this.editor);
  }

  private startEditing() {
    if(this.editor) {
      this.stopEditing();
    }
    this.editor = this.editorContainer.createComponent(this.factoryService.getFactory(TextFieldEditorComponent));
    this.editor.instance.value = this.value;
    this.editor.instance.valueValidated.subscribe((newValue: string) => this.valueChange.emit(newValue));
    this.editor.instance.close.subscribe(() => this.stopEditing());
  }

  private stopEditing() {
    if(!this.editor) {
      return;
    }
    this.editorContainer.clear();
    this.editor = null;
  }
}
