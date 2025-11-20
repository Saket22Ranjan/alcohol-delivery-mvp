import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "Verification",
      questions: [
        {
          q: "How does the age verification process work?",
          a: "Our verification process has three steps: (1) You enter your date of birth and we instantly verify you're 21+, (2) You upload a government-issued ID, (3) Our trained team manually reviews your ID within 1-2 business days. Once approved, you can shop freely.",
        },
        {
          q: "How long does ID verification take?",
          a: "Most ID verifications are completed within 1-2 business days. You'll receive an email notification once your verification is approved. During peak times, it may take slightly longer.",
        },
        {
          q: "What IDs are accepted?",
          a: "We accept driver's licenses, state ID cards, passports, and military IDs. The ID must be government-issued, current (not expired), and show your photo and date of birth clearly.",
        },
        {
          q: "What if my ID is rejected?",
          a: "If your ID is rejected, you'll receive an email explaining the reason. Common reasons include blurry photos, expired IDs, or incomplete information. You can re-upload a clearer image at any time.",
        },
      ],
    },
    {
      category: "Ordering & Delivery",
      questions: [
        {
          q: "How do I place an order?",
          a: "After completing verification, browse local stores, add items to your cart, enter your delivery address, and checkout. You'll receive order confirmation and tracking information via email.",
        },
        {
          q: "What's the minimum order amount?",
          a: "Minimum order amounts vary by store, typically ranging from $20-$35. You'll see the minimum clearly displayed on each store's page.",
        },
        {
          q: "How long does delivery take?",
          a: "Most deliveries arrive within 30-60 minutes depending on your location and the store's availability. You can choose a delivery time slot during checkout.",
        },
        {
          q: "Do I need to be home to receive my order?",
          a: "Yes, someone 21+ must be present to receive alcohol deliveries. The delivery driver will verify your ID at the door. We cannot leave alcohol unattended.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and digital payment methods like Apple Pay and Google Pay.",
        },
        {
          q: "Are there delivery fees?",
          a: "Yes, delivery fees are typically $5.99 but may vary based on distance and order size. You'll see the exact fee before checkout.",
        },
        {
          q: "Can I tip my delivery driver?",
          a: "Yes! You can add a tip during checkout or in cash when your order arrives. 100% of tips go directly to your delivery driver.",
        },
      ],
    },
    {
      category: "Account & Security",
      questions: [
        {
          q: "Is my personal information secure?",
          a: "Absolutely. We use bank-level encryption for all data transmission and storage. Your ID is securely encrypted and only accessed by trained verification staff. We never share your information with third parties.",
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can request account deletion at any time through your profile settings. Your data will be permanently removed from our systems within 30 days.",
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Forgot Password' on the login page and we'll send a reset link to your email. You can also use phone or email verification codes to log in without a password.",
        },
      ],
    },
    {
      category: "Problems & Support",
      questions: [
        {
          q: "What if I receive a damaged or incorrect order?",
          a: "Contact us immediately through the app or via email. We'll work with the store to resolve the issue, typically through a refund or replacement order.",
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be modified or cancelled within 5 minutes of placement. After that, contact the store directly or our support team for assistance.",
        },
        {
          q: "How do I contact customer support?",
          a: "You can reach us through the Contact page, via email at support@liquorlane.com, or through the in-app chat feature available 7 days a week.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about Liquor Lane
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6 bg-gradient-card border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 bg-gradient-card border-border/50 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Contact our support team
          </p>
          <a href="/contact">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-primary text-primary-foreground hover:shadow-glow-amber hover:scale-105 transition-all duration-300 font-bold h-10 px-4 py-2">
              Contact Support
            </button>
          </a>
        </Card>
      </div>
    </div>
  );
}
