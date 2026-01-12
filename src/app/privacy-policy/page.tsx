import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GC Studio",
  description: "Learn how we collect, use, and protect your personal information in our privacy policy.",
};

const PrivacyPolicyPage = () => {
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
            <h1 className="h1 font-bold text-black mb-4 sm:mb-6">Privacy Policy</h1>
            <p className="text-sm text-[#878787]">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">1. Introduction</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                At GC Studio, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">2. Information We Collect</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Personal information such as name, email address, and phone number</li>
                <li>Usage data and analytics information</li>
                <li>Cookies and tracking technologies</li>
                <li>Information you provide when contacting us</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">3. How We Use Your Information</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and requests</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Analyze usage patterns and trends</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">4. Information Sharing</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in 
                the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in operating our website</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">5. Data Security</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">6. Your Rights</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">7. Cookies</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser 
                settings, though this may affect the functionality of our website.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">8. Changes to This Policy</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
                Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8 sm:mb-12">
              <h2 className="h2 font-semibold text-black mb-4 sm:mb-6">9. Contact Us</h2>
              <p className="para text-base text-gray-700 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

