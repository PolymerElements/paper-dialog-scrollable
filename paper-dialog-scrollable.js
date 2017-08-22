import '../polymer/polymer.js';
import '../iron-flex-layout/iron-flex-layout.js';
import { PaperDialogBehaviorImpl } from '../paper-dialog-behavior/paper-dialog-behavior.js';
import '../paper-styles/default-theme.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';

Polymer({
  _template: `
    <style>

      :host {
        display: block;
        @apply --layout-relative;
      }

      :host(.is-scrolled:not(:first-child))::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      :host(.can-scroll:not(.scrolled-to-bottom):not(:last-child))::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      .scrollable {
        padding: 0 24px;

        @apply --layout-scroll;
        @apply --paper-dialog-scrollable;
      }

      .fit {
        @apply --layout-fit;
      }
    </style>

    <div id="scrollable" class="scrollable" on-scroll="updateScrollState">
      <slot></slot>
    </div>
`,

  is: 'paper-dialog-scrollable',

  properties: {

    /**
     * The dialog element that implements `Polymer.PaperDialogBehavior` containing this element.
     * @type {?Node}
     */
    dialogElement: {
      type: Object
    }

  },

  /**
   * Returns the scrolling element.
   */
  get scrollTarget() {
    return this.$.scrollable;
  },

  ready: function () {
    this._ensureTarget();
    this.classList.add('no-padding');
  },

  attached: function() {
    this._ensureTarget();
    requestAnimationFrame(this.updateScrollState.bind(this));
  },

  updateScrollState: function() {
    this.toggleClass('is-scrolled', this.scrollTarget.scrollTop > 0);
    this.toggleClass('can-scroll', this.scrollTarget.offsetHeight < this.scrollTarget.scrollHeight);
    this.toggleClass('scrolled-to-bottom',
      this.scrollTarget.scrollTop + this.scrollTarget.offsetHeight >= this.scrollTarget.scrollHeight);
  },

  _ensureTarget: function () {
    // Read parentElement instead of parentNode in order to skip shadowRoots.
    this.dialogElement = this.dialogElement || this.parentElement;
    // Check if dialog implements paper-dialog-behavior. If not, fit scrollTarget to host.
    if (this.dialogElement && this.dialogElement.behaviors &&
        this.dialogElement.behaviors.indexOf(PaperDialogBehaviorImpl) >= 0) {
      this.dialogElement.sizingTarget = this.scrollTarget;
      this.scrollTarget.classList.remove('fit');
    } else if (this.dialogElement) {
      this.scrollTarget.classList.add('fit');
    }
  }
});
