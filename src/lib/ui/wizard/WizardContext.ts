import { createContext } from "react";

import type { StepData } from "./Wizard";

interface IWizardContext {
    activeStepIndex: number;
    steps: StepData[];
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    /**
     * Registers a step to the wizard context store.
     * used in order to enable step inter-component communication and determine their order by document order.
     */
    register: (step: StepData) => void;
    /**
     * Deregisters a step to the wizard context store.
     */
    deregister: (stepValue: StepData) => void;
    onSubmit: (...params: any[]) => void;
}

export const WizardContext = createContext({} as IWizardContext);
