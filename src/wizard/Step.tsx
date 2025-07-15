import { forwardRef, useContext, useEffect, useMemo, useRef, type PropsWithChildren, type RefObject } from "react";
import { WizardContext } from "./Wizard.context";

const StepContent = forwardRef<HTMLDivElement, PropsWithChildren>(({ children }, ref) => {
    useEffect(() => {
        console.log('ref in StepContent useEffect:', ref);
    }, [ref]);
    return <div ref={ref}>{children}</div>;
});


export const Step = ({ children }: PropsWithChildren) => {
    const stepRef = useRef<HTMLDivElement>(null);
    const { register, deregister, steps, activeStepIndex } = useContext(WizardContext);

    const stepIndex = useMemo(() => steps.findIndex(s => s === stepRef), [steps]);

    const isActiveStep = stepIndex === activeStepIndex;

    useEffect(() => {
        register(stepRef as RefObject<HTMLElement>);

        return () => void (deregister(stepRef as RefObject<HTMLElement>));
    }, [])

    // Defer content unless currently active.

    return <span ref={stepRef}>
        {isActiveStep && children}
    </span>
}