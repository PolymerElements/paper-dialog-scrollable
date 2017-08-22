import { PaperDialogBehavior } from '../../paper-dialog-behavior/paper-dialog-behavior.js';
import { Polymer } from '../../polymer/lib/legacy/polymer-fn.js';
Polymer({
  _template: `
    <slot name="title"></slot>
    <paper-dialog-scrollable id="scrollable">
      <slot></slot>
    </paper-dialog-scrollable>
`,

  is: 'test-dialog',
  behaviors: [PaperDialogBehavior]
});
