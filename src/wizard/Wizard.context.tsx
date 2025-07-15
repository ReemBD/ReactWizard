import { createContext, useMemo, useState, type PropsWithChildren, type ReactNode, type Ref, type RefObject } from "react";

interface IWizardContext {
    activeStepIndex: number;
    steps: RefObject<HTMLElement>[];
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    register: (step: RefObject<HTMLElement>) => void;
    deregister: (step: RefObject<HTMLElement>) => void;
}

export const WizardContext = createContext({} as IWizardContext);

export const Wizard = ({ children }: PropsWithChildren) => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const [_unorderedSteps, setUnorderedSteps] = useState(new Set<RefObject<HTMLElement>>());
    const steps = useMemo(() => [..._unorderedSteps].sort(_sortSteps), [_unorderedSteps])

    function _sortSteps(a: RefObject<HTMLElement>, b: RefObject<HTMLElement>) {
        return (a.current.compareDocumentPosition(b.current) & Node.DOCUMENT_POSITION_PRECEDING) > 0 ? 1 : -1;
    }

    /**
     * Registers a step to the wizard context store.
     * used in order to enable step intercommunication and determine their order by document order.
     */
    const register = (step: RefObject<HTMLElement>) => {
        setUnorderedSteps(prev => new Set([...prev, step]));
    }

    /**
     * Deregisters a step to the wizard context store.
     */
    const deregister = (step: RefObject<HTMLElement>) => {
        setUnorderedSteps(prev => new Set([...prev].filter(s => s !== step)));
    }

    return <WizardContext.Provider
        value={{
            activeStepIndex,
            setActiveStepIndex,
            steps,
            register,
            deregister,
        }}
    >
        {children}
    </WizardContext.Provider>
}