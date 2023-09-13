import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PaymentLink } from '@/lib/types';
import CardInformationForm from './form';
import LoadingIndicator from '@/components/ui/loading-indicator';
import { AppPage } from '@/pages/_app.page';
import { Db } from '@/constants';
import { supabase } from '@/supabase';

const PaymentPage: AppPage = () => {
  const {
    query: { id: slug },
  } = useRouter();

  const [paymentLinkInfo, setPaymentLinkInfo] = useState<PaymentLink>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (slug) getPaymentLinkInfo();
  }, [slug]);

  async function getPaymentLinkInfo() {
    if (slug && typeof slug === 'string') {
      try {
        const { data, error } = await supabase.from(Db.payment_link__table).select().match({ slug }).single();
        if (error) setError(error.message);
        else setPaymentLinkInfo(data);
      } catch (e: unknown) {
        setError('Invalid payment link');
      }
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <div className="w-screen h-screen">
        <LoadingIndicator />
      </div>
    );

  if (error)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="flex items-center flex-col w-full">
      <p>Pay {paymentLinkInfo?.first_name}</p>
      <CardInformationForm />
    </div>
  );
};

PaymentPage.removeDefaultScaffold = true;
export default PaymentPage;
