import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import AlertAPI from './../../AlertAPI'
import Toast from '../../Toast'
import moment from 'moment'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
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

  moreInfoHandler(){
    const sensorDialog = document.createElement('sl-dialog')
    
    sensorDialog.className = 'sensor-dialog'

    const sensorDialogContent = html`
     <h1>SENSOR ACTIVE</h1>

     

     <sl-spinner class="sensor-spinner" style="font-size: 80px; --track-width: 20px;"></sl-spinner>

     
     


     <h2 style="color:#018793" >Status: GOOD</h2>


     

    `

    render(sensorDialogContent, sensorDialog)

    // append to ducment.body
    document.body.append(sensorDialog)

    //show sl-dialog
    sensorDialog.show()

    // on hide delete
    sensorDialog.addEventListener('sl-after-hide', () => {
      sensorDialog.remove()
    })
    

  }

  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">


        <div class="right-side-menu">
          <div class="vessel-details">
            <div>
              <img class="vessel-profile-image" src="/images/vessel-profile-image.jpg">
            </div>
            <div class="vessel-details-text">
              <h2>SERENITY</h2>
              <h4>Princess - F62</h4>
            </div>
          </div>


        


        <div class="mapouter"><div class="gmap_canvas"><iframe width="350" height="350" id="gmap_canvas" src="https://maps.google.com/maps?q=swan%20yacht%20club&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://2piratebay.org"></a><br><style>.mapouter{position:relative;text-align:right;height:350px;width:350px;}</style><a href="https://www.embedgooglemap.net">google maps for website</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:350px;width:350px;}</style></div></div>
        
        </div>
      

      

      

        



        <div class="sensor-grid">
          <div> 
            <sl-card @click=${this.moreInfoHandler.bind(this)} class="sensor">
              <sl-icon class="sensor-icon" name="wrench" style="color: #042029;font-size: 70px;"></sl-icon>
            </sl-card>
            <div class="sensor-title"> 
              ENGINE
            </div>
          </div>
          <div> 
            <sl-card class="sensor">
              <sl-icon @click=${this.moreInfoHandler.bind(this)} class="sensor-icon" name="plug-fill" style="color: #042029;font-size: 70px;"></sl-icon>
            </sl-card>
            <div class="sensor-title"> 
              SHORE POWER
            </div>
          </div>
          <div> 
            <sl-card class="sensor">
              <sl-icon @click=${this.moreInfoHandler.bind(this)} class="sensor-icon" name="droplet-fill" style="color: #042029;font-size: 70px;"></sl-icon>
            </sl-card>
            <div class="sensor-title"> 
              BILGE PUMP
            </div>
          </div>
          <div> 
            <sl-card class="sensor">
              <sl-icon @click=${this.moreInfoHandler.bind(this)} class="sensor-icon" name="battery-full" style="color: #042029;font-size: 70px;"></sl-icon>
            </sl-card>
            <div class="sensor-title"> 
              BATTERY
            </div>
          </div>
          <div> 
            <sl-card class="sensor">
              <sl-icon @click=${this.moreInfoHandler.bind(this)} class="sensor-icon" name="geo-fill" style="color: #042029;font-size: 70px;"></sl-icon>
            </sl-card>
            <div class="sensor-title"> 
              GEOFENCE
            </div>
          </div>
        </div>

        

        <div class="alerts-header">Alerts</div>

        <p></p>
        

        
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

export default new HomeView()