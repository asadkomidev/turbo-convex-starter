import React from "react";
import {
  AppSection,
  AppSectionHeader,
  AppSectionTitle,
  AppSectionDescription,
  AppSectionContent,
} from "@/components/app/app-section";
import { faqsContent } from "./config/content";
import { FAQItem } from "./components/faq-item";

export const FAQs = () => {
  return (
    <AppSection className="flex flex-col items-start gap-12 px-4 lg:flex-row max-w-5xl mx-auto">
      <AppSectionHeader className="w-full">
        <AppSectionTitle subTitle>FAQs</AppSectionTitle>
        <AppSectionDescription subTitle>
          Everything you need to know about our starter kit
        </AppSectionDescription>
      </AppSectionHeader>
      <AppSectionContent>
        <div className="divide-y divide-dashed w-full space-y-6">
          {faqsContent.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </AppSectionContent>
    </AppSection>
  );
};
