import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from '../../Toast'

class VesselsView {
  init(){
    console.log('VesselView.init')
    document.title = 'Vessels'  
    this.vessels = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getVessels()
  }

  async getVessels(){
    try{
      this.vessels = await VesselAPI.getVessels()
      console.log(this.vessels)
      this.render()
    }catch(err){
      Toast.show(err,'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Vessels" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  

        <div class="haircuts-grid">
        ${this.vessels == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.vessels.map(vessel => html`
            <sl-card class="haircut-card">
              <img src="${App.apiBase}/images/${vessel.image}" alt="${vessel.name}" slot="image" />
              <h2>${vessel.name}</h2>
            </sl-card>
          `)}
        `}
        </div> 

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new VesselsView()