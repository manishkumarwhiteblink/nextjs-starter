'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const initialCheckDone = useRef(false);

  useEffect(() => {
    // Only redirect if initial auth check is complete
    if (!loading && !isAuthenticated && initialCheckDone.current) {
      router.push('/login');
    }
    initialCheckDone.current = true;
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}