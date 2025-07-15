import { useContext, useEffect, useRef, type PropsWithChildren } from "react";
import { WizardContext } from "./Wizard.context";

export const Step = ({ children }: PropsWithChildren) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { register, deregister } = useContext(WizardContext);

    useEffect(() => {
        contentRef.current && register(contentRef.current);

        return () => {
            contentRef.current && deregister(contentRef.current);
        };
    }, [contentRef.current])

    return <div ref={contentRef}>
        {children}
    </div>
}