"use client";

import { Twitter, AtSign, Briefcase, Globe } from "lucide-react";
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

export const revalidate = 100;

const Accounts = () => {
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => setOpen(false), [open]);

  return (
    <div className="bg-white">
      <Card className="border border-slate-300">
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center">
            Business Information
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
                  <DialogTitle>Edit business information</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <AccountUpdateForm onClose={onClose} />
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
              Business Name
              <span className="text-slate-950">'Business name'</span>
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
            <Twitter className="mr-2" size={18} />
            <div className="flex flex-col text-slate-500 text-sm">
              Twitter Handle
              <span className="text-slate-950">@twitter_handle</span>
            </div>
          </div>

          <div className="flex flex-row">
            <Globe className="mr-2" size={18} />
            <div className="flex flex-col text-slate-500 text-sm">
              Business Website
              <span className="text-slate-950">www.webisite.url</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounts;
