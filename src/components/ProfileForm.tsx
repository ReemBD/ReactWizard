import { useEffect } from "react"
import type { RegisterOptions } from "react-hook-form"
import { useForm } from "react-hook-form"

import { Step, Wizard } from "../lib/ui/wizard/public"
import { ProfileFormHeader } from "./ProfileFormHeader";
import { ProfileFormError } from "./ProfileFormError";
import { SubmitSuccessful } from "./SubmitSuccessful";

export interface ProfileForm {
    name: string;
    age: number;
    email: string;
    country: string;
}

const profileFormValidation: {
    name: RegisterOptions<ProfileForm, 'name'>,
    age: RegisterOptions<ProfileForm, 'age'>,
    email: RegisterOptions<ProfileForm, 'email'>,
    country: RegisterOptions<ProfileForm, 'country'>,
} = {
    name: {
        required: "Name is required",
        maxLength: { value: 20, message: "Max length is 20" },
    },
    age: {
        required: "Age is required",
        min: { value: 18, message: "Minimum age is 18" },
    },
    email: {
        required: "Email is required",
        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
    },
    country: {
        required: "Country is required",
    },
};

export const ProfileForm = () => {
    const {
        trigger,
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm<ProfileForm>({
        defaultValues: {
            name: '',
            age: 0,
            email: '',
            country: '',
        },
        mode: 'all'
    });

    // Display required errors on form load
    useEffect(() => {
        trigger()
    }, [trigger]);

    const onSubmit = (data: ProfileForm) => {
        console.debug('Sending very real data to backend...', data);
    }

    if (isSubmitSuccessful) return <SubmitSuccessful />

    return <div className="flex flex-col items-center justify-center">
        <Wizard
            onSubmit={handleSubmit(onSubmit)}
        >
            <ProfileFormHeader />
            {/* TODO: Create Stepper component to exist seperately from ProfileFormHeader inside Wizard component */}
            <Step value="name" valid={!errors.name}>
                <label htmlFor="name" className="block font-semibold mb-4">Please enter your name</label>
                <input
                    id="name"
                    {...register("name", profileFormValidation.name)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your name"
                />
                <ProfileFormError error={errors.name} />
            </Step>
            <Step value="age" valid={!errors.age}>
                <label htmlFor="age" className="block font-semibold mb-4">Please enter your age</label>
                <input
                    id="age"
                    type="number"
                    {...register("age", profileFormValidation.age)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your age"
                />
                <ProfileFormError error={errors.age} />
            </Step>
            <Step value="email" valid={!errors.email}>
                <label htmlFor="email" className="block font-semibold mb-4">Please enter your email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", profileFormValidation.email)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your email"
                />
                <ProfileFormError error={errors.email} />
            </Step>
            <Step value="country" valid={!errors.country}>
                <label htmlFor="country" className="block font-semibold mb-4">Please enter your country</label>
                <input
                    id="country"
                    {...register("country", profileFormValidation.country)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your country"
                />
                <ProfileFormError error={errors.country} />
            </Step>
        </Wizard>
    </div>
}