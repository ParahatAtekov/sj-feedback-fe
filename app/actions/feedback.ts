'use server';

import { revalidatePath } from 'next/cache';
import { Feedback } from '@/types/feedback';
import { z } from 'zod';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const feedbackSchema = z.object({
    satisfaction: z.enum(['very disappointed', 'somewhat disappointed', 'not disappointed']),
    comment: z.string().max(500).optional(),
    screenshot: z.instanceof(File).optional(),
});

export async function submitFeedback(formData: FormData): Promise<{ success: true } | { error: string }> {
    try {
        const rawData = {
            satisfaction: formData.get('satisfaction') as string,
            comment: formData.get('comment') as string | null,
            screenshot: formData.get('screenshot') as File | null,
        };

        const validated = feedbackSchema.parse(rawData);

        const payload = new FormData();
        payload.append('satisfaction', validated.satisfaction);
        if (validated.comment) {
            payload.append('comment', validated.comment);
        }
        if (validated.screenshot && validated.screenshot.size > 0) {
            payload.append('screenshot', validated.screenshot);
        }

        const res = await fetch(`${API_URL}/api/feedback`, {
            method: 'POST',
            body: payload,
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.message || 'Failed to submit feedback' };
        }

        revalidatePath('/feedback/view');
        return { success: true };
    }   catch (err: any) {
        return { error: err.message || 'Validation Failed' };
    }
}

export async function getAllFeedback(): Promise<Feedback[]> {
    const res = await fetch(`${API_URL}/api/feedback`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch feedback');
    }

    return res.json();
}