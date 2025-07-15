import { useMemo, useState, type PropsWithChildren, type RefObject } from "react";

import { NextButton, PrevButton, WizardActions } from "./WizardActions";
import { WizardContext } from "./WizardContext";

export interface StepData {
    value: string;
    valid: boolean;
    ref: RefObject<HTMLElement>;
}

interface WizardProps {
    onSubmit: (event: SubmitEvent) => void;
}

export const Wizard = ({ children, onSubmit }: PropsWithChildren<WizardProps>) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const [_unorderedSteps, setUnorderedSteps] = useState(new Set<StepData>());
    const steps = useMemo(() => [..._unorderedSteps].sort(_sortSteps), [_unorderedSteps])

    const valid = steps[activeStepIndex]?.valid;

    function _sortSteps(a: StepData, b: StepData) {
        return (a.ref.current.compareDocumentPosition(b.ref.current) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
    }

    /**
     * Registers a step to the wizard context store.
     * used in order to enable step inter-component communication and determine their order by document order.
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
            onSubmit,
            valid,
        }}
    >
        <form className="min-w-[500px] bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            {children}
            <WizardActions>
                <PrevButton />
                <NextButton />
            </WizardActions>
        </form>
    </WizardContext.Provider>
}