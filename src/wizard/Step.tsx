import { useContext, useEffect, useMemo, useRef, type PropsWithChildren, type RefObject } from "react";
import { WizardContext } from "./Wizard.context";

export interface StepProps {
    value: string;
    valid: boolean;
}

export const Step = ({ children, value, valid }: PropsWithChildren<StepProps>) => {
    const ref = useRef<HTMLDivElement>(null);
    const { register, deregister, steps, activeStepIndex } = useContext(WizardContext);

    const stepIndex = useMemo(() => steps.findIndex(s => s.value === value), [steps]);

    const isActiveStep = stepIndex === activeStepIndex;

    useEffect(() => {
        register({ valid, value, ref: ref as RefObject<HTMLElement> });

        return () => deregister(value);
    }, [valid, value, ref])

    return <div style={{ display: isActiveStep ? 'block' : 'none' }} ref={ref}>
        {children}
    </div>
}