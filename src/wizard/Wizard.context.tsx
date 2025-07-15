interface IWizardContext {
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    register: (child: HTMLElement) => void;
    deregister: (child: HTMLElement) => void;
}
