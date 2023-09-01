"use client";

import { AtSign, Briefcase, Globe, Link } from "lucide-react";
import { PencilSimple } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountUpdateForm from "../components/form";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export const revalidate = 100;

const Accounts = () => {
  const { paymentLink } = useAuth();
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), [open]);

  return (
    <div className="bg-white">
      <Card className="border border-slate-300">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            Account Information
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"primary"}
                  className="rounded-md"
                >
                  <PencilSimple />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Edit account information</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <AccountUpdateForm
                    onClose={onClose}
                    payment_link={paymentLink?.slug}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <Separator className="mb-3" />
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-start">
          <div className="flex flex-row">
            <Briefcase className="mr-2" size={18} />
            <div className="flex flex-col text-slate-500 text-sm">
              Full Name
              <span className="text-slate-950">'Full name'</span>
            </div>
          </div>

          <div className="flex flex-row">
            <AtSign className="mr-2" size={18} />
            <div className="flex flex-col text-slate-500 text-sm">
              Email address
              <span className="text-slate-950">Email Address</span>
            </div>
          </div>

          <div className="flex flex-row">
            <Link className="mr-2" size={18} />
            <div className="flex flex-col text-slate-500 text-sm">
              Payment Link
              <span className="text-slate-950">{paymentLink?.slug}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
