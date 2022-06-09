import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-haircut'
import './components/sensor-tile'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})