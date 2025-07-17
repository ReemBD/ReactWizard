import { useMemo, useState, type FormEvent, type PropsWithChildren, type ReactNode, type RefObject } from "react";

import { WizardContext } from "./WizardContext";

export interface StepData {
    ref: RefObject<HTMLElement>;
}

interface WizardProps {
    header?: ReactNode;
    onSubmit: (...params: any[]) => void;
}

export const Wizard = ({ children, header, onSubmit }: PropsWithChildren<WizardProps>) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const [_unorderedSteps, setUnorderedSteps] = useState(new Set<StepData>());
    const steps = useMemo(() => [..._unorderedSteps].sort(_sortSteps), [_unorderedSteps]);

    function _sortSteps(a: StepData, b: StepData) {
        return (a.ref.current.compareDocumentPosition(b.ref.current) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
    }

    const register = (step: StepData) => {
        setUnorderedSteps(prev => new Set([...prev, step]));
    }

    const deregister = (step: StepData) => {
        setUnorderedSteps(prev => new Set([...prev].filter(s => s.ref !== step.ref)));
    }

    const _onSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        onSubmit(ev);
    }

    return <WizardContext.Provider
        value={{
            activeStepIndex,
            setActiveStepIndex,
            steps,
            register,
            deregister,
            onSubmit,
        }}
    >
        {header}
        <form onSubmit={_onSubmit} className="min-w-[500px] bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            {children}
        </form>
    </WizardContext.Provider>
}