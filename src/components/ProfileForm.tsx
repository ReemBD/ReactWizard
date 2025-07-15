import { useContext } from "react"
import type { RegisterOptions } from "react-hook-form"
import { useForm } from "react-hook-form"
import { Step, Wizard, WizardContext } from "../wizard"
import { NextButton, PrevButton, WizardActions } from "../wizard/WizardActions";

interface ProfileForm {
    name: string;
    age: number;
    isSubscribed: boolean;
}

const profileFormValidation: {
    name: RegisterOptions<ProfileForm, 'name'>,
    age: RegisterOptions<ProfileForm, 'age'>,
    isSubscribed: RegisterOptions<ProfileForm, 'isSubscribed'>,
} = {
    name: {
        required: "Name is required",
        maxLength: { value: 20, message: "Max length is 20" },
    },
    age: {
        required: "Age is required",
        min: { value: 18, message: "Minimum age is 18" },
    },
    isSubscribed: {},
};

export const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues: {
            name: '',
            age: 0,
            isSubscribed: false,
        },
        mode: 'all'
    });

    const valid = !Object.keys(errors).length;

    const onSubmit = (data: ProfileForm) => {
        alert(JSON.stringify(data, null, 2));
    };

    return <Wizard>
        <form className="w-[400px]" onSubmit={handleSubmit(onSubmit)}>
            <Step value="name" valid={!!errors.name}>
                <label className="block mb-2 font-medium">Name</label>
                <input
                    {...register("name", profileFormValidation.name)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </Step>
            <Step value="age" valid={!!errors.age}>
                <label className="block mb-2 font-medium">Age</label>
                <input
                    type="number"
                    {...register("age", profileFormValidation.age)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your age"
                />
                {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
            </Step>
            <Step value="isSubscribed" valid={!!errors.isSubscribed}>
                <label className="block mb-2 font-medium">
                    <input type="checkbox" {...register("isSubscribed", profileFormValidation.isSubscribed)}
                        className="mr-2 align-middle" />
                    Subscribe to newsletter
                </label>
            </Step>
            <WizardActions>
                <PrevButton />
                <NextButton />
            </WizardActions>
        </form>
    </Wizard>
}