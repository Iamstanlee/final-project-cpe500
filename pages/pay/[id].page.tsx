import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PaymentLink } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { Star } from "lucide-react";
import CardInformationForm from "./form";
import LoadingIndicator from "@/components/ui/loading-indicator";

function PaymentPage() {
  const {
    query: { id: link },
  } = useRouter();

  const { getPaymentLink } = useAuth();
  const [paymentLinkInfo, setPaymentLinkInfo] = useState<PaymentLink>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    if (link) getPaymentLinkInfo();
  }, [link]);

  async function getPaymentLinkInfo() {
    if (link && typeof link === "string") {
      try {
        const payLink = await getPaymentLink(link);
        if (payLink.error) setError(payLink.error);
        else setPaymentLinkInfo(payLink.data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.message);
        } else setError("payment link not found");
      }
      setIsLoading(false);
    }
  }

  if (isLoading)
    <div className="w-screen h-screen">
      <LoadingIndicator />
    </div>;

  return (
    <div className="flex items-center flex-col w-full">
      <div className="flex flex-col sm:flex-row md:justify-end w-full">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
          <div className="fixed left-0 top-0 p-5 flex h-full w-full sm:w-1/2 flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {paymentLinkInfo?.metadata?.user_name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {paymentLinkInfo?.metadata?.user_email}
              </p>
            </div>
            <div className="display flex">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star size={15} className="fill-amber-500" key={value} />
              ))}
              <span className="text-xs ml-2 underline cursor-pointer text-indigo-500">
                30 Reviews
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          <CardInformationForm />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
