import './App.css'
import { Step } from './wizard/Step'
import { Wizard } from './wizard/Wizard.context'

function App() {

  return (
    <div>
      <Wizard>
        <Step>Hello world</Step>
      </Wizard>
    </div>
  )
}

export default App
