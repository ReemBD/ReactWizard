import { useContext } from 'react'
import './App.css'
import { Step } from './wizard/Step'
import { Wizard, WizardContext } from './wizard/Wizard.context'

const NextButton = () => {
  const { activeStepIndex, setActiveStepIndex, steps } = useContext(WizardContext);
  const isLastStep = activeStepIndex >= steps.length - 1

  return <button
    disabled={isLastStep}
    onClick={() => setActiveStepIndex(prev => prev + 1)}
    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
  >
    {isLastStep ? 'Done' : 'Next'}
  </button>
}

const PrevButton = () => {
  const { activeStepIndex, setActiveStepIndex } = useContext(WizardContext);
  const isFirstStep = activeStepIndex <= 0;

  return <button
    disabled={isFirstStep}
    onClick={() => setActiveStepIndex(prev => prev - 1)}
    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors mr-2 cursor-pointer"
  >
    Back
  </button>
}

function App() {

  return (
    <div>
      <Wizard>
        <section>
          <Step>First Step</Step>
          <Step>Second Step</Step>
          <Step>Third Step</Step>
        </section>
        <section>
          <NextButton />
          <PrevButton />
        </section>
      </Wizard>
    </div>
  )
}

export default App
