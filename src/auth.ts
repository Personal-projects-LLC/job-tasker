import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';

export const auth = () => getServerSession(authConfig);

export type { Session } from 'next-auth';
