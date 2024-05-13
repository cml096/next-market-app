
import Image from 'next/image';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import React from "react";
import {notFound} from "next/navigation";

interface MealDetails {
    title: string;
    summary: string;
    creator: string;
    creator_email: string;
    image: string;
    instructions: string;
}

export async function generateMetadata({ params }: { params: { mealSlug: string } }) {
    const meal = getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    };
}

export default function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
    const meal: MealDetails = getMeal(params.mealSlug);

    if (!meal) {
        notFound();
    }

    // @ts-ignore
    meal.instructions = React.createElement('div', { dangerouslySetInnerHTML: { __html: meal.instructions.replace(/\n/g, '<br />') } });

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image
                        src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
                        alt={meal.title}
                        width={500}
                        height={300}
                        fill
                    />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: meal.instructions as string,
                    }}
                ></p>
            </main>
        </>
    );
}
