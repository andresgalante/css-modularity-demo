(function() {
'use strict';

customElements.define('my-component', class extends HTMLElement {

  constructor() {
    super(); // always call super() first in the ctor.

    // Create shadow DOM for the component.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>

        /* The :host :host(<selector>) selector
          =========================================== */
         :host {
           display: block;
           /*background: tan;*/
           /*padding: 4em;*/
         }

         :host(.blue) {
           /*background: blue;*/
         }

         :host([disabled]) {
           /*background: grey;*/
         }

        /* The ::host-context(<selector>) selector
           =========================================== */
         :host-context(.darktheme) {
           /*background: black;*/
           /*color: white;*/
         }

        /* The :slotted(<compound-selector>) selector
           =========================================== */
         ::slotted(p){
           /*color: pink;*/
         }

        /* CSS variables and mixins
           =========================================== */
         p, ::slotted(p){
           /*background: var(--bg-color, red);*/
           /*@apply --pink-theme;*/
         }

        p { color: red }

      </style>

      <h1>Stylin' the ShadowDOM</h1>

      <slot>
        <p>ShadowDOM slot placeholder paragraph</p>
      </slot>

    `;
  }

});

})();
