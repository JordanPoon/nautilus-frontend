import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-sensor', class Sensor extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      }      
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  render(){    
    return html`
    <style>
      .wrap {
        
        
      }
    </style>

    <sl-card>
        <sl-icon name="wrench" style="color: #042029;font-size: 70px;"></sl-icon>
    </sl-card>    
    `
  }
  
})
