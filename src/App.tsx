import { useContext, useState } from 'react'

import { Wizard, WizardContext, Step } from './wizard'

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
