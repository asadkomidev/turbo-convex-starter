import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { FeatureCardIcon } from "../components/feature-card-icon";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
}

export const FeatureCard = ({ title, description, icon }: Props) => {
  return (
    <Card className="group shadow-none text-center">
      <CardHeader className=" ">
        <FeatureCardIcon>{icon}</FeatureCardIcon>
        <h3 className="mt-6 font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
