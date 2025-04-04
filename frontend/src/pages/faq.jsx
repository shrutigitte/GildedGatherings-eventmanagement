import { useState } from 'react';

const FaQues = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Gilded Gatherings?",
      answer: "Gilded Gatherings is a premium event management service specializing in curating luxurious and unforgettable experiences. From corporate galas to private celebrations, we ensure every event shines with elegance and perfection."
    },
    {
      question: " What types of events do you manage?",
      answer: "We handle a wide array of events, including corporate functions, weddings, anniversaries, luxury birthday parties, product launches, fashion shows, charity events, and more. If you can envision it, we can bring it to life with grandeur."
    },
    {
      question: "How do I book an event with Gilded Gatherings?",
      answer: "Booking an event is simple! You can either fill out our online booking form available on our website or contact us directly via phone or email. Our team will guide you through the entire process from concept to execution."
    },
    {
      question: "What makes Gilded Gatherings different from other event planners?",
      answer: "Our commitment to luxury, meticulous attention to detail, and a passion for creating extraordinary experiences set us apart. We tailor every event to reflect your vision, style, and personality with a touch of opulence."
    },
    {
      question: "Can you customize themes and decor according to my preferences?",
      answer: "Absolutely! We pride ourselves on our ability to customize every aspect of your event. From personalized decor to bespoke menus and entertainment, we ensure your vision comes to life exactly as you imagined."
    },
    {
      question: "What safety measures do you follow during events?",
      answer: "Safety is a top priority at Gilded Gatherings. We adhere to all health and safety guidelines, including proper sanitization, crowd management, and contingency planning to ensure a safe and smooth event experience."
    },
    {
      question: "How far in advance should I book an event?",
      answer: "We recommend booking your event at least 3-6 months in advance to ensure availability and ample time for planning. However, we can accommodate shorter timelines depending on the event's scope and requirements."
    },
    {
      question: "Do you offer event packages or custom pricing?",
      answer: "We offer both! While our luxurious event packages provide a seamless experience, we also provide tailored solutions to meet your unique requirements and budget."
    },
    {
      question: "Can I view a portfolio of past events?",
      answer: "Yes, absolutely! Visit our Gallery section on the website to explore our previous creations. Each event is a testament to our dedication to excellence and elegance."
    },
    {
      question: "How can I contact Gilded Gatherings for more information?",
      answer: "You can reach us via our Contact Us page, email, or phone. Our friendly team is always ready to assist you in planning a lavish and memorable event."
    }
  ];

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl p-3 font-bold md:text-4xl font-monomakh md:leading-tight text-white">Frequently<br />asked questions</h2>
            <p className="mt-1 hidden p-4 font-monomakh md:block text-gray-400">Answers to the most frequently asked questions.</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="divide-y divide-white">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  className="flex items-center justify-between w-full text-start text-white font-semibold md:text-lg hover:text-gray-500"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  {faq.question}
                  <svg
                    className={`transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ${
                    activeIndex === index ? 'max-h-screen' : 'max-h-0'
                  }`}
                >
                  <p className="mt-3 text-gray-200">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaQues;
