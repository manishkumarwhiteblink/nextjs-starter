// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '@/store/store';
// import { getAccountDetails } from '@/store/slices/authSlice';

// interface AuthGuardProps {
//   children: React.ReactNode;
// }

// export default function AuthGuard({ children }: AuthGuardProps) {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated, loading, user } = useSelector(
//     (state: RootState) => state.auth
//   );
//   console.log(isAuthenticated, loading);
//   useEffect(() => {
//     if (!user?.email && !loading && isAuthenticated) {
//       dispatch(getAccountDetails());
//     }
//   }, [dispatch, user?.email, loading, isAuthenticated]);

//   useEffect(() => {
//     if (isAuthenticated && !loading) {
//       router.replace('/dashboard');
//     } else {
//       router.replace('/login');
//     }
//   }, [isAuthenticated, loading, router]);

//   return <>{children}</>;
// }

'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import {
  getAccountDetails,
  setAdminCredentials,
} from '@/store/slices/authSlice';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  const token = Cookies.get('auth_token');

  const isAuthenticated = useMemo(() => {
    if (!token) return false;
    if (token === 'admin_token') return true;
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return Date.now() < exp * 1000;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && !user?.email && !loading) {
      if (token === 'admin_token') {
        dispatch(setAdminCredentials());
      } else {
        dispatch(getAccountDetails());

      }
    }
  }, [dispatch, isAuthenticated, user?.email, loading, token]);

  useEffect(() => {
    if (loading) return;

    const currentPath = window.location.pathname;

    if (isAuthenticated && currentPath === '/login') {
      router.replace('/dashboard');
    } else if (!isAuthenticated && currentPath !== '/login') {
      router.replace('/login');
    }
    // if (isAuthenticated && currentPath !== '/dashboard') {
    //   router.replace(currentPath);
    // } else if (!isAuthenticated && currentPath !== '/login') {
    //   Cookies.remove('auth_token');
    //   router.replace('/login');
    // }
  }, [isAuthenticated, loading, router]);

  return <>{children}</>;
}
