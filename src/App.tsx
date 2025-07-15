import { Wizard } from './wizard'

import './App.css'
import { ProfileForm } from './components/ProfileForm'

function App() {

  return (
    <div>
      <Wizard>
        <ProfileForm />
      </Wizard>
    </div>
  )
}

export default App
