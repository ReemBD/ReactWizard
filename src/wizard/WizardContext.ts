import { createContext } from "react";
import type { StepData } from "./Wizard";

interface IWizardContext {
    activeStepIndex: number;
    steps: StepData[];
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    register: (step: StepData) => void;
    deregister: (stepValue: StepData['value']) => void;
    onSubmit: (event: SubmitEvent) => void;
    valid: boolean;
}

export const WizardContext = createContext({} as IWizardContext);
