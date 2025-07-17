import { useContext, useEffect, useMemo, useRef, type PropsWithChildren, type RefObject } from "react";

import { WizardContext } from "./WizardContext";
import { Button } from "../button/Button";

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
            <Button
                variant="secondary"
                disabled={first}
                onClick={() => !first && setActiveStepIndex(prev => prev - 1)}
            >
                {'Back'}
            </Button>
            <Button
                variant="primary"
                type={last ? 'submit' : 'button'}
                disabled={!valid}
                onClick={() => !last && setActiveStepIndex(prev => prev + 1)}
            >
                {(last ? 'Done' : 'Next')}
            </Button>
        </div>
    </div>
}