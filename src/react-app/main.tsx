import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addMonths, isBefore, isAfter, startOfDay } from "date-fns";

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const today = startOfDay(new Date());
  const maxDate = addMonths(today, 6);

  const [date, setDate] = useState<Date | undefined>(today);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelectDate = (selectedDate?: Date) => {
    if (
      selectedDate &&
      !isBefore(selectedDate, today) &&
      !isAfter(selectedDate, maxDate)
    ) {
      setDate(selectedDate);
      setShowCalendar(false);
    }
  };

  const faqs = [
    {
      q: "What is included in the mock exam?",
      a: "Each exam includes papers that simulate real 11+ formats (GL, CEM, or ISEB), timed conditions, and scannable answer sheets where applicable."
    },
    {
      q: "How quickly will I get results?",
      a: "You’ll receive a detailed performance report via email the same day the mock exam is completed."
    },
    {
      q: "Can I change my exam booking?",
      a: "Yes, you can reschedule or cancel your booking up to 48 hours before the exam date via your account dashboard."
    },
    {
      q: "Is the exam suitable for all boards?",
      a: "Yes. We offer exams aligned to the most common 11+ boards – GL, CEM, and ISEB – and you can select the relevant format when booking."
    },
    {
      q: "Do you offer online mock exams?",
      a: "Absolutely. Our online exams offer the same difficulty and structure as in-person ones, with secure timing and submission features."
    },
    {
      q: "How can I help my child prepare before the mock exam?",
      a: "We recommend regular practice using 11+ preparation materials, a calm test environment, and ensuring your child understands the format."
    },
    {
      q: "How do I know which mock exam format to choose?",
      a: "This depends on the schools you're applying to. Check their admission requirements or contact us for guidance."
    },
    {
      q: "Do you provide payment receipts?",
      a: "Yes, a receipt will be emailed to you immediately after successful payment."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit and debit cards, Apple Pay, Google Pay, and PayPal."
    },
    {
      q: "Is there a refund policy?",
      a: "Yes. You can receive a full refund if you cancel at least 48 hours before the booked exam date."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-blue-50">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Prepare with Confidence for the 11+ Exam
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Our expertly crafted mock exams provide the closest experience to the real 11+ exam — giving your child the confidence, practice, and feedback they need to succeed.
        </p>
        <Popover open={showCalendar} onOpenChange={setShowCalendar} modal={true}>
          <PopoverTrigger asChild>
            <Button
              className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl text-lg"
              onClick={() => setShowCalendar((prev) => !prev)}
            >
              {date ? `Book for ${format(date, "PPP")}` : "Book a Mock Exam"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelectDate}
              initialFocus
              fromDate={today}
              toDate={maxDate}
            />
          </PopoverContent>
        </Popover>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-4 gap-6 py-12 px-6 bg-white">
        {[{icon: "🎯", title: "Realistic Exam Simulation", text: "Designed to match GL, CEM, and ISEB formats. Timed like real exams. Uses OCR-scannable answer sheets."},
          {icon: "📊", title: "Instant, Insightful Feedback", text: "Same-day performance reports. Benchmarking. Topic-wise breakdowns."},
          {icon: "🏠", title: "Flexible Options", text: "Online or in-person exams. Multiple locations across the UK."},
          {icon: "🧑‍🏫", title: "Expertly Created Content", text: "Written by experienced 11+ educators. Updated syllabus."}].map((feature, idx) => (
          <Card key={idx} className="text-center p-4 shadow-sm">
            <CardContent>
              <div className="text-4xl mb-2" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Book Now Section */}
      <section className="py-12 px-6 bg-blue-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Book a Mock Exam Now</h2>
            <p className="mb-6 text-gray-700">
              Choose your exam format and secure your spot today. Whether online or in-person, your child will benefit from high-quality preparation.
            </p>
            <Popover open={showCalendar} onOpenChange={setShowCalendar} modal={true}>
              <PopoverTrigger asChild>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-xl text-base"
                  onClick={() => setShowCalendar((prev) => !prev)}
                >
                  {date ? `Selected: ${format(date, "PPP")}` : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSelectDate}
                  initialFocus
                  fromDate={today}
                  toDate={maxDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">Why Book Now?</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Limited slots per date – secure your preferred date early.</li>
              <li>Prepare your child with the most accurate practice.</li>
              <li>Gain valuable feedback to focus future study sessions.</li>
              <li>Peace of mind knowing your child is ready.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md w-full md:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Step 1: Book</h3>
            <p className="text-gray-600">Choose your exam format (online or in-person), select the date and time that suits you, and confirm your booking easily through our streamlined system. Payment can be made securely online during booking.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md w-full md:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Step 2: Take Exam</h3>
            <p className="text-gray-600">Your child attends the mock exam on the booked date. The exam is proctored, timed, and follows official board standards to ensure real-world experience. Online exams are taken via our secure testing platform.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md w-full md:w-1/4">
            <h3 className="text-xl font-semibold mb-2">Step 3: Get Feedback</h3>
            <p className="text-gray-600">Receive detailed reports including scores, question-level analysis, time efficiency, and benchmarking against peers. These insights help focus preparation where it's needed most.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">What Parents Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow">
              <CardContent className="p-6">
                <p className="text-gray-700 italic">“The mock exams helped my child feel much more prepared. The feedback was incredibly useful!”</p>
                <p className="text-sm font-semibold mt-4">– Parent {i}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg bg-white p-4 shadow-sm">
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full text-left flex items-center justify-between font-semibold text-lg"
              >
                Q: {faq.q}
                {openFAQ === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openFAQ === i && (
                <p className="text-gray-600 mt-2">A: {faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white p-6 text-center">
        <p>&copy; {new Date().getFullYear()} Eleven Plus Mock Exams. All rights reserved.</p>
        <p className="text-sm mt-2">Website by EduCraft Digital</p>
      </footer>
    </main>
  );
}
