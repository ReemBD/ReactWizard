import { useContext, useEffect, useMemo, useRef, type PropsWithChildren, type RefObject } from "react";

import { WizardContext } from "./WizardContext";

export interface StepProps {
    value: string;
    valid: boolean;
}

export const Step = ({ children, valid }: PropsWithChildren<StepProps>) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const { register, deregister, steps, activeStepIndex, setActiveStepIndex } = useContext(WizardContext);

    const stepIndex = useMemo(() => steps.findIndex(s => s.ref === elementRef), [steps, elementRef]);

    const isActiveStep = stepIndex === activeStepIndex;

    useEffect(() => {
        register({ ref: elementRef as RefObject<HTMLElement> });

        return () => deregister({ ref: elementRef as RefObject<HTMLElement> });
    }, [])

    const last = activeStepIndex >= steps.length - 1;
    const first = activeStepIndex <= 0;

    return <div className={`${!isActiveStep && 'hidden'}`} ref={elementRef}>
        {children}
        <div className="mt-4 flex gap-2 justify-between">
            <button
                type="button"
                disabled={first}
                onClick={() => !first && setActiveStepIndex(prev => prev - 1)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors mr-2 cursor-pointer"
            >
                {'Back'}
            </button>
            <button
                type={last ? 'submit' : 'button'}
                disabled={!valid}
                onClick={() => !last && setActiveStepIndex(prev => prev + 1)}
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
                {(last ? 'Done' : 'Next')}
            </button>
        </div>
    </div>
}