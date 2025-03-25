"use client";

import React from "react";
import { Button } from "@workspace/ui/components/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const SuccessScreen = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1,
          }}
        >
          <CheckCircle className="h-16 w-16 text-green-500" />
        </motion.div>
        <h1 className="mb-4 text-2xl font-bold tracking-tight">
          Subscription Successful!
        </h1>
        <p className="mb-8 text-base max-w-lg text-muted-foreground">
          Thank you for subscribing. Your account has been successfully
          upgraded. You now have access to all premium features.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="default" size="lg" className="rounded-2xl">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
