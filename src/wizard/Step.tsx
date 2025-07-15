import { useContext, useEffect, useRef, type PropsWithChildren, type RefObject } from "react";
import { WizardContext } from "./Wizard.context";

export const Step = ({ children }: PropsWithChildren) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const { register, deregister } = useContext(WizardContext);

    useEffect(() => {
        elementRef.current && register(elementRef as RefObject<HTMLElement>);

        return () => {
            elementRef.current && deregister(elementRef as RefObject<HTMLElement>);
        };
    }, [elementRef])

    return <div ref={elementRef}>
        {children}
    </div>
}