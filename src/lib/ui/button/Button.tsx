import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
    variant: 'primary' | 'secondary';
    stroked?: boolean;
    elevated?: boolean;
}

export const Button = ({ children, stroked, elevated, variant }: PropsWithChildren<ButtonProps>) => {

    const baseClasses = 'px-4 py-2'

    const strokedClasses = ''
    return <button className={twMerge(baseClasses)}>

    </button>
}