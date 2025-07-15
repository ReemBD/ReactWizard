import type { FieldError } from "react-hook-form";

interface Props {
    error?: FieldError
}

export const ProfileFormError = ({ error }: Props) =>
    <div className={`text-red-500 text-sm h-6 ${!error?.message && 'opacity-0'}`}>
        {error?.message}
    </div>