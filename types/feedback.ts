export interface Feedback {
    id: string;
    satisfaction: 'very disappointed' | 'somewhat disappointed' | 'not disappointed';
    comment: string | null;
    screenshot_url: string | null;
    created_at: string;
}