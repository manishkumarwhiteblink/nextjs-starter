'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return null;
  if (isAuthenticated) return null;
  return <>{children}</>;
}
