import { useContext, type PropsWithChildren } from "react";

import { WizardContext } from "./WizardContext";

export const NextButton = ({ children }: PropsWithChildren) => {
    const { activeStepIndex, setActiveStepIndex, steps, valid, onSubmit } = useContext(WizardContext);

    const isLastStep = activeStepIndex >= steps.length - 1

    return <button
        type={isLastStep ? 'submit' : 'button'}
        disabled={!valid}
        onClick={(ev) => !isLastStep && setActiveStepIndex(prev => prev + 1)}
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
        {children || (isLastStep ? 'Done' : 'Next')}
    </button>
}

export const PrevButton = ({ children }: PropsWithChildren) => {
    const { activeStepIndex, setActiveStepIndex } = useContext(WizardContext);
    const isFirstStep = activeStepIndex <= 0;

    return <button
        type="button"
        disabled={isFirstStep}
        onClick={() => !isFirstStep && setActiveStepIndex(prev => prev - 1)}
        className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors mr-2 cursor-pointer"
    >
        {children || 'Back'}
    </button>
}

export const WizardActions = ({ children }: PropsWithChildren) => {
    return <div className="mt-4 flex gap-2 justify-between">
        {children}
    </div>
}