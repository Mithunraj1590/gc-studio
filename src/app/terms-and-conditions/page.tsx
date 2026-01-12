import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | GC Studio",
  description: "Read our terms and conditions to understand the rules and regulations for using our services.",
};

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#878787] hover:text-black transition-colors duration-300 mb-6"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="h1 font-bold text-black mb-4 sm:mb-6">Terms & Conditions</h1>
            <p className="text-sm text-[#878787]">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">1. Introduction</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                Welcome to GC Studio. These Terms and Conditions ("Terms") govern your access to and use of our website and services. 
                By accessing or using our services, you agree to be bound by these Terms.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">2. Acceptance of Terms</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                By accessing this website, you accept these Terms and Conditions in full. If you disagree with any part of these terms, 
                you must not use our website or services.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">3. Use of Services</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">4. Intellectual Property</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of GC Studio 
                or its content suppliers and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">5. Limitation of Liability</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                GC Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting 
                from your use of or inability to use our services.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">6. Changes to Terms</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting 
                the new Terms on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">7. Contact Information</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

