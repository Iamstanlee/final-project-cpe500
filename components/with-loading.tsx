import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import LoadingIndicator from '@/loading-indicator';

export default function withLoading<P>(Component: React.ComponentType<P>) {
  return (props: any) => {
    const { isLoading } = useAuth();
    if (isLoading)
      return (
        <div className="w-screen h-screen">
          <LoadingIndicator />
        </div>
      );

    return <Component {...props} />;
  };
}
