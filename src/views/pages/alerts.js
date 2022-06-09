import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import AlertAPI from './../../AlertAPI'
import Toast from '../../Toast'
import moment from 'moment'

class AlertsView {
  init(){
    document.title = 'Alerts' 
    this.alerts = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getAlerts()
  }

  async getAlerts(){
    try{
      this.alerts = await AlertAPI.getAlerts()
      console.log(this.alerts)
      this.render()
    }catch(err){
      Toast.show(err,'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Alerts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  

      <div class="alerts-grid">
      ${this.alerts == null ? html`
        <sl-spinner></sl-spinner>
      ` : html`

      
        ${this.alerts.map(alert => html`
          <sl-card class="alerts-card">


            <div class="alert-icon">
              <sl-icon name="${alert.icon}" style="color: #CB7B49;font-size: 50px;"></sl-icon>
            </div>


            <div class="alert-content">
              <div class="alert-title-date">
                <h3>${alert.type}</h3>
                <div>${moment(alert.createdAt).format('MMMM Do YYYY, @ h:mm a')}</div>
                
              </div>
              <div class="alert-description">
                <div>${alert.description}</div>
              </div>
            </div>

            

          </sl-card>
        `)}
      `}
      </div>

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new AlertsView()