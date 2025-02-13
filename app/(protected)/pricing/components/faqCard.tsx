export const FAQCard = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h3 className="font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </div>
  );
};
