import { Wizard } from './wizard'

import './App.css'
import { ProfileWizardForm } from './components/ProfileForm'

function App() {

  return (
    <div>
      <Wizard>
        <ProfileWizardForm />
      </Wizard>
    </div>
  )
}

export default App
