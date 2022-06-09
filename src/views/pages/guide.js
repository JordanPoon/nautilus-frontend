import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Guide" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      
      <div class="guide-content">

      <h3>Welcome ${Auth.currentUser.firstName}!</h3>
      <p>This is a quick tour to teach you the basics of using Nautilus ...</p>
      
      <div class="guide-row">
        <div class="guide-step">
          <h4>1. Nautilus is a boat monitoring web app.</h4> 
          <img src="/images/guide-image-one.jpg">
        </div>
      
        <div class="guide-step">
          <h4>2. See alerts sent from sensors on your boat.</h4>
          <img src="/images/guide-image-two.jpg">
        </div>

      </div>

      <div class="guide-row">
        <div class="guide-step">
          <h4>3. To simulate alerts being sent an admin account is used to send alerts to boat owner's dashboard.</h4>
          <img src="/images/guide-image-three.jpg">
        </div>
      
        <div class="guide-step">
          <h4>4. Monitor status of your boat's sensors and view vessel details or location via map.</h4>
          <img src="/images/guide-image-four.jpg">
        </div>

      </div>
      
      <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button> 
    
      </div>  
      
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()