import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
    variant: 'primary' | 'secondary';
    stroked?: boolean;
    elevated?: boolean;
} & Record<string, any>

export const Button = ({ children, stroked, elevated, variant, ...restOfProps }: PropsWithChildren<ButtonProps>) => {

    const baseClasses = 'px-4 py-2 rounded font-medium transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed';

    const strokedClasses = 'border border-current bg-transparent hover:bg-gray-50 focus:bg-gray-100';
    const elevatedClasses = 'shadow-md hover:shadow-lg focus:shadow-lg';

    const primaryClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-800 disabled:bg-blue-300';
    const secondaryClasses = 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-300 disabled:bg-gray-200';

    const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;

    return <button
        {...restOfProps}
        className={twMerge(
            baseClasses,
            stroked ? strokedClasses : '',
            elevated ? elevatedClasses : '',
            variantClasses
        )}>
        {children}
    </button>
}