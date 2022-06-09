import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import AlertAPI from './../../AlertAPI'
import Toast from '../../Toast'

class newAlertView {
  init(){
    document.title = 'Template'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newAlertSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData

    try{
      await AlertAPI.newAlert(formData)
      Toast.show('Alert added!')
      submitBtn.removeAttribute('loading') 
      
    
    
    }catch(err){
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')  
    }
    



  }

  render(){
    const template = html`
      <va-app-header title="Admin" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content admin-page"> 
      

        <div class="send-alert-graph">
          <div class="vessel-device-graph">
              <img class="vessel-image-admin" src="/images/vessel-profile-image.jpg">
              <sl-icon class="" name="phone-vibrate-fill" style="color: #042029;font-size: 70px;"></sl-icon>
              <sl-icon class="laptop-icon" name="laptop" style="color: #042029;font-size: 70px;"></sl-icon>
          </div>
          
          
          

          

        </div>

        <sl-progress-bar indeterminate class="progress-bar"></sl-progress-bar>
        


        <h2>Send Alert / Reminder</h2>
        
        
        
        &nbsp
        <h3>Sensor Type</h3>

        <sl-form class="page-form" @sl-submit=${this.newAlertSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <sl-select name="type" placeholder="Choose Sensor Type">
              <sl-menu-item value="Engine Alert">Engine</sl-menu-item>
              <sl-menu-item value="Shore Power Alert">Shore Power</sl-menu-item>
              <sl-menu-item value="Bilge Pump Alert">Bilge Pump</sl-menu-item>
              <sl-menu-item value="Battery Alert">Battery</sl-menu-item>
              <sl-menu-item value="Geofence Alert">Geofence</sl-menu-item>
              <sl-menu-item value="Engine Reminder">Engine Reminder</sl-menu-item>
              <sl-menu-item value="Bilge Pump Reminder">Bilge Pump Reminder</sl-menu-item>
              <sl-menu-item value="Battery Reminder">Battery Reminder</sl-menu-item>
          </sl-select>

          <p></p>

          <h3>Icon</h3>

          <sl-select name="icon" placeholder="Choose Icon">
              <sl-menu-item value="exclamation-square-fill">Alert</sl-menu-item>
              <sl-menu-item value="clock-fill">Reminder</sl-menu-item>
          </sl-select>

          <p></p>

          <h3>Description</h3>

          <sl-select name="description" placeholder="Choose Description">
              <sl-menu-item value="Check Engine">Engine</sl-menu-item>
              <sl-menu-item value="Disconnected">Shore Power</sl-menu-item>
              <sl-menu-item value="Water Too High">Bilge Pump</sl-menu-item>
              <sl-menu-item value="Check Battery">Battery</sl-menu-item>
              <sl-menu-item value="Vessel Outside Geofence">Geofence</sl-menu-item>
              <sl-menu-item value="Engine has reached 200 hours of use">Engine Reminder</sl-menu-item>
              <sl-menu-item value="Bilge Pump has reached 200 hours of use">Bilge Pump Reminder</sl-menu-item>
              <sl-menu-item value="Battery has reached 200 hours of use">Battery Reminder</sl-menu-item>
          </sl-select>

          <p></p>

          <sl-button type="primary" class="submit-btn send-alert-btn" submit>Send Alert</sl-button>
        </sl-form>  
        

      </div>
      
      
    `
    render(template, App.rootEl)
  }

  



}


export default new newAlertView()