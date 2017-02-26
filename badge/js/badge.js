(function() {
'use strict';

// Feature detect
if (!(window.customElements && document.body.attachShadow)) {
  document.querySelector('access-badge').innerHTML = "<b>Your browser doesn't support Shadow DOM and Custom Elements v1.</b>";
  return;
}

customElements.define('access-badge', class extends HTMLElement {

  constructor() {
    super(); // always call super() first in the ctor.

    // Create shadow DOM for the component.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
      :host {
        position: relative;
        display:block; /* Custom elements are inline */
        width: 18em;
        padding: 7em 0 5em 0;
        border-radius: 1em;
        color: #222;
        text-align: center;
        background-color: var(--pf-bg, white);
        font-family: Arial, sans-serif;
        box-shadow: 2px 10px 10px -6px rgba(0,0,0,.5);
      }

      :host-context(.patternfly) {
        color: white;
        background-color: black;
      }

      :host-context(.patternfly)::after {
        background: #f2f2f2;
        color: #222;
        content: var(--pf-label, "Contributor");
      }

      :host-context(.patternfly)::before {
        background-image: url(img/pf-logo.svg);
      }

      :host::before {
        content: " ";
        background-image: url(img/rh-logo.svg);
        background-repeat: no-repeat;
        background-position: center center;
        height: 3em;
        top: 2em;
        left: 0;
        position: absolute;
        width: 100%;
      }

      :host::after {
        content: "Visitor";
        background: #004153;
        position: absolute;
        left: 0;
        padding: .6em 0;
        font-size: 1.2em;
        bottom: 1em;
        width: 100%;
        color: white;
        text-transform: uppercase;
      }

      :host([contractor])::after{
        content: "Contractor";
        background: #0088CE;
      }

      :host([employee])::after{
        content: "Employee";
        background: #CC0000;
      }

      img { display: block; }

      ::slotted(img), .avatar{
        margin: 0em 3em .5em 3em;
        width: calc(100% - 6em);
      }

      .name ::slotted(*){
        margin: 0;
        font-size: 2em;
        display: block;
      }

      ::slotted([slot="name--last"]), .name--last {   font-weight: bold;
       }
      ::slotted([slot="name--first"]), .name--first { font-weight: normal;
      }

      *[class^="name--"]{
        display: block;
        font-size: 2em;
      }

      </style>

      <slot name="user-avatar">
        <img src="img/default-avatar.jpg" alt="Placeholder avatar" class="avatar">
      </slot>

      <div class="name">

        <slot name="name--first">
          <span class="name--first">
            Visitor
          </span>
        </slot>

        <slot name="name--last">
          <span class="name--last">
            Badge
          </slot>
        </span>

      </div>

    `;
  }

});

})();
