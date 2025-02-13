import React from 'react'
import { FAQCard } from './faqCard'

export default function FaqsSection() {
  return (
    <div>
     <div className="mt-16 border-t pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <FAQCard
            question="How does the 14-day trial work?"
            answer="You can try any plan free for 14 days. No credit card required."
          />
          <FAQCard
            question="Can I switch plans later?"
            answer="Yes, you can upgrade or downgrade your plan at any time."
          />
          <FAQCard
            question="What payment methods do you accept?"
            answer="We accept all major credit cards, PayPal, and bank transfers."
          />
        </div>
      </div>
      </div>
  )
}
