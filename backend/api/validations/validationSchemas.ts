import z from 'zod';

export const codeSnippetSubmitSchema = z.object({
    username: z.string().min(3).max(100),
    stdin: z.string().min(1),
    source_code: z.string().min(1),
    preferred_language: z.string().regex(/^(python|javascript|java|c\+\+)$/i, 'Invalid language'),
});
