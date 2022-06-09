import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="page-content page-centered">

        <div class="sign-in"> 
          <div class="nautilus-logo">
            <img class="nautilus-icon" src="/images/nautilus-icon.svg" />
            <img class="nautilus-title" src="/images/nautilus-title.svg" />
          </div>
          <div class="sign-in-text">
          <h1>Sign In</h1>  
        </div>

               
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}> 
            <h4>Email</h4>       
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Enter Your Email" required></sl-input>
            </div>
            <h4>Password</h4>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Enter Your Password" required toggle-password></sl-input>
            </div>

            <sl-button class="submit-btn sign-in-btn" type="primary" submit style="width: 100%;">Sign In</sl-button>

          </sl-form>

          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>

        </div>

        <div class="sign-in-box">
        <img class="sign-in-img" src="/images/sign-in-image.jpg">
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()