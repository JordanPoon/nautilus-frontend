import { LitElement, html, css } from '@polymer/lit-element'
import { render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-haircut', class Haircut extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },    
      gender: {
        type: String
      },
      length: {
        type: String
      }                       
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add className
    dialogEl.className = 'haircut-dialog'
    
    // sl-dialog content
    const dialogContent = html`
        <style>
            .wrap {
                display: flex;
            }
            .image {
                width: 50%;
            }
            .image img {
                width: 100%;
            }
            .content {
                padding-left: 1em;
            }
            .gender span,
            .length span {
                text-transform: uppercase;
                font-weight: bold;
             }
        </style>
    <div class="wrap">
        <div class="image">
            <img src="${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
            <h1>${this.name}</h1>
            <p>${this.description}</p>
            <p class="price">$${this.price}</p>
            <p class="gender">Gender: <span>${this.gender}</span></p>
            <p class="length">Length: <span>${this.length}</span></p>
        </div>
    </div>
    `

    render(dialogContent, dialogEl)
    
    // append to document.body
    document.body.append(dialogEl)

    // show sl-dialog
    dialogEl.show()

    dialogEl.addEventListener('sl-after-hide', ()=> {
        dialogEl.remove
    })
  }


  
  render(){    
    return html`
    <style>

    </style>
      
    <sl-card>
        <img slot="image" src="${this.image}" />
        <h2>${this.name}</h2>
        <h3>$${this.price}</h3>
        <p class="author">${this.user.firstName} ${this.user.lastName}</p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
    </sl-card>
    `
  }
  
})