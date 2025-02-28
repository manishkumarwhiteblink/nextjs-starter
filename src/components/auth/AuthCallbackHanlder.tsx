'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { handleGoogleLogin } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store/store';
import { Loader2 } from 'lucide-react';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      dispatch(handleGoogleLogin(code))
        .unwrap()
        .then(() => router.push('/dashboard'))
        .catch(() => router.push('/login?error=auth_failed'));
    } else {
      router.push('/login');
    }
  }, [dispatch, router, searchParams]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
