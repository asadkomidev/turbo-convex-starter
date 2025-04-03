import React from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  answerTitle: string;
  answerList: string[];
}

export const FAQItem = ({
  question,
  answer,
  answerTitle,
  answerList,
}: FAQItemProps) => {
  return (
    <div className="pb-6">
      <h3 className="font-medium">{question}</h3>
      {answer && <p className="text-muted-foreground mt-4 text-sm">{answer}</p>}
      {answerTitle && (
        <p className="text-muted-foreground mt-4 text-sm">{answerTitle}</p>
      )}
      {answerList && (
        <ul className="list-outside list-disc space-y-2 pl-4 text-sm">
          {answerList.length > 0 &&
            answerList.map((item, index) => (
              <li key={index} className="text-muted-foreground mt-4">
                {item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
