import { useContext } from "react"
import type { RegisterOptions } from "react-hook-form"
import { useForm } from "react-hook-form"
import { Step, Wizard, WizardContext } from "../wizard"

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

const NextButton = () => {
    const { activeStepIndex, setActiveStepIndex, steps } = useContext(WizardContext);
    const isLastStep = activeStepIndex >= steps.length - 1

    return <button
        disabled={isLastStep}
        onClick={() => setActiveStepIndex(prev => prev + 1)}
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
    >
        {isLastStep ? 'Done' : 'Next'}
    </button>
}

const PrevButton = () => {
    const { activeStepIndex, setActiveStepIndex } = useContext(WizardContext);
    const isFirstStep = activeStepIndex <= 0;

    return <button
        disabled={isFirstStep}
        onClick={() => setActiveStepIndex(prev => prev - 1)}
        className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors mr-2 cursor-pointer"
    >
        Back
    </button>
}

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
        }
    });

    const onSubmit = (data: ProfileForm) => {
        alert(JSON.stringify(data, null, 2));
    };

    return <Wizard>
        <form className="w-[400px]" onSubmit={handleSubmit(onSubmit)}>
            <Step>
                <label className="block mb-2 font-medium">Name</label>
                <input
                    {...register("name", profileFormValidation.name)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your name"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </Step>
            <Step>
                <label className="block mb-2 font-medium">Age</label>
                <input
                    type="number"
                    {...register("age", profileFormValidation.age)}
                    className="border rounded px-3 py-2 w-full mb-1"
                    placeholder="Enter your age"
                />
                {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
            </Step>
            <Step>
                <label className="block mb-2 font-medium">
                    <input type="checkbox" {...register("isSubscribed", profileFormValidation.isSubscribed)}
                        className="mr-2 align-middle" />
                    Subscribe to newsletter
                </label>
            </Step>
            <section className="mt-4 flex gap-2">
                <PrevButton />
                <NextButton />
            </section>
        </form>
    </Wizard>
}