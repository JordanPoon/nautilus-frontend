import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import HaircutAPI from './../../HaircutAPI'
import Toast from '../../Toast'

class HaircutsView {
  init(){
    document.title = 'Haircuts' 
    this.haircuts = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getHaircuts()
  }

  async getHaircuts(){
    try{
      this.haircuts = await HaircutAPI.getHaircuts()
      console.log(this.haircuts)
      this.render()
    }catch(err){
      Toast.show(err,'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Haircuts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
        
        <div class="haircuts-grid">
        ${this.haircuts == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.haircuts.map(haircut => html`
            <sl-card class="haircut-card">
              <img src="${App.apiBase}/images/${haircut.image}" alt="${haircut.name}" slot="image" />
              <h2>${haircut.name}</h2>
              <h3>$${haircut.price}</h3>
              <p>${haircut.description}</p>
              <p>By ${haircut.user.firstName} ${haircut.user.lastName}</p>
            </sl-card>
          `)}
        `}
        </div> 

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new HaircutsView()