import Link from 'next/link';
import Image from 'next/image';

import classes from './meal-item.module.css';

export interface MealItemProps {
    id: string;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
}

export default function MealItem({ title, slug, image, summary, creator }: MealItemProps) {
    const base_url = process.env.AWS_BUCKET_BASE_URL;
    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image
                        src={`${base_url}${image}`}
                        alt={title}
                        fill />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}