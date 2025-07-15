import { createContext, useMemo, useState, type PropsWithChildren, type ReactNode } from "react";

interface IWizardContext {
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    register: (child: HTMLElement) => void;
    deregister: (child: HTMLElement) => void;
}

export const WizardContext = createContext({} as IWizardContext);

export const Wizard = ({ children }: PropsWithChildren) => {
    const [activeStep, setActiveStep] = useState(0);

    const [_unorderedSteps, setUnorderedSteps] = useState(new Set<HTMLElement>());
    const steps = useMemo(() => [..._unorderedSteps].sort(_sortSteps), [_unorderedSteps])

    function _sortSteps(a: HTMLElement, b: HTMLElement) {
        return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
    }

    /**
     * Registers a step to the wizard context store.
     * used in order to enable step intercommunication and determine their order by document order.
     */
    const register = (child: HTMLElement) => {
        _unorderedSteps.add(child);
        setUnorderedSteps(_unorderedSteps);
    }

    /**
     * Deregisters a step to the wizard context store.
     */
    const deregister = (child: HTMLElement) => {
        _unorderedSteps.delete(child);
        setUnorderedSteps(_unorderedSteps);
    }

    return <WizardContext.Provider value={{ activeStep, setActiveStep, register, deregister }}>
        {children}
    </WizardContext.Provider>
}