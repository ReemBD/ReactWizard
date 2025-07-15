import { useContext, useEffect, useMemo, useRef, type PropsWithChildren, type RefObject } from "react";

import { WizardContext } from "./WizardContext";

export interface StepProps {
    value: string;
    valid: boolean;
}

export const Step = ({ children, value, valid }: PropsWithChildren<StepProps>) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const { register, deregister, steps, activeStepIndex } = useContext(WizardContext);

    const stepIndex = useMemo(() => steps.findIndex(s => s.value === value), [steps, value]);

    const isActiveStep = stepIndex === activeStepIndex;

    useEffect(() => {
        register({ valid, value, ref: elementRef as RefObject<HTMLElement> });

        return () => deregister(value);
    }, [valid, value, elementRef])

    return <div className={`${!isActiveStep && 'hidden'}`} ref={elementRef}>
        {children}
    </div>
}