'use client';

import { useFormState } from 'react-dom';

import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import {FormEvent, SyntheticEvent, useState} from "react";

interface FormState {
    name: string;
    email: string;
    title: string;
    summary: string;
    instructions: string;
    message: string | null;
}

export default function ShareMealPage() {
    const [formState, setFormState] = useState<FormState>({
        name: '',
        email: '',
        title: '',
        summary: '',
        instructions: '',
        message: null,
    });

    function handleChange(event: SyntheticEvent): void {
        const target = event.target as HTMLInputElement;
        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();
        try {
            await shareMeal(formState);
            setFormState({ ...formState, message: 'Meal shared successfully!' });
        } catch (error) {
            setFormState({ ...formState, message: 'Error sharing meal' });
        }
    }

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows={10}
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Your image" name="image" />
                    {formState.message && <p>{formState.message}</p>}
                    <p className={classes.actions}>
                        <MealsFormSubmit />
                    </p>
                </form>
            </main>
        </>
    );
}
