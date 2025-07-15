import { createContext, useMemo, useState, type PropsWithChildren, type ReactNode, type Ref, type RefObject } from "react";

interface StepData {
    value: string;
    valid: boolean;
    ref: RefObject<HTMLElement>;
}
interface IWizardContext {
    activeStepIndex: number;
    steps: StepData[];
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    register: (step: StepData) => void;
    deregister: (stepValue: StepData['value']) => void;
    valid: boolean;
}

export const WizardContext = createContext({} as IWizardContext);

export const Wizard = ({ children }: PropsWithChildren) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const [_unorderedSteps, setUnorderedSteps] = useState(new Set<StepData>());
    const steps = useMemo(() => [..._unorderedSteps].sort(_sortSteps), [_unorderedSteps])

    const valid = steps[activeStepIndex]?.valid;

    function _sortSteps(a: StepData, b: StepData) {
        return (a.ref.current.compareDocumentPosition(b.ref.current) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
    }

    /**
     * Registers a step to the wizard context store.
     * used in order to enable step intercommunication and determine their order by document order.
     */
    const register = (step: StepData) => {
        setUnorderedSteps(prev => new Set([...prev, step]));
    }

    /**
     * Deregisters a step to the wizard context store.
     */
    const deregister = (value: StepData['value']) => {
        setUnorderedSteps(prev => new Set([...prev].filter(s => s.value !== value)));
    }

    return <WizardContext.Provider
        value={{
            activeStepIndex,
            setActiveStepIndex,
            steps,
            register,
            deregister,
            valid,
        }}
    >
        {children}
    </WizardContext.Provider>
}