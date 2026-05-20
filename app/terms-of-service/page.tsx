export default function TermsOfServicePage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-400 mb-12">
          Effective Date: May 20, 2026
        </p>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>

          <p className="text-gray-300 leading-8">
            By accessing and using this website, you agree to comply with and
            be bound by these Terms of Service. If you do not agree with any
            part of these terms, please do not use our website or services.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. Use of Our Services
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            You agree to use our website and services only for lawful purposes.
          </p>

          <ul className="list-disc pl-6 text-gray-300 space-y-3">
            <li>Do not misuse or attempt to disrupt our services</li>
            <li>Do not submit false or misleading information</li>
            <li>Do not engage in unauthorized access or security breaches</li>
            <li>Do not use our content without permission</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            3. Event Registration & Payments
          </h2>

          <p className="text-gray-300 leading-8">
            Event registrations may require payment. By submitting payment
            details, you confirm that the information provided is accurate and
            authorized.
          </p>

          <p className="text-gray-300 leading-8 mt-4">
            All payments are subject to applicable taxes and fees. Refund
            policies may vary depending on the event.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            4. Intellectual Property
          </h2>

          <p className="text-gray-300 leading-8">
            All content on this website, including text, graphics, logos,
            images, videos, and branding, is the property of the company and is
            protected by intellectual property laws.
          </p>

          <p className="text-gray-300 leading-8 mt-4">
            You may not reproduce, distribute, or use any content without prior
            written permission.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            5. User Content
          </h2>

          <p className="text-gray-300 leading-8">
            Any information or content submitted by users must not violate any
            laws or third-party rights.
          </p>

          <p className="text-gray-300 leading-8 mt-4">
            We reserve the right to remove any inappropriate or harmful content
            without notice.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>

          <p className="text-gray-300 leading-8">
            We are not liable for any direct, indirect, incidental, or
            consequential damages resulting from the use of our website,
            services, or event participation.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            7. Third-Party Links
          </h2>

          <p className="text-gray-300 leading-8">
            Our website may contain links to third-party websites. We are not
            responsible for the content, policies, or practices of those
            external sites.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            8. Termination
          </h2>

          <p className="text-gray-300 leading-8">
            We reserve the right to suspend or terminate access to our services
            at any time without prior notice if these Terms are violated.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            9. Changes to Terms
          </h2>

          <p className="text-gray-300 leading-8">
            We may update these Terms of Service at any time. Continued use of
            the website after updates constitutes acceptance of the revised
            terms.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            10. Governing Law
          </h2>

          <p className="text-gray-300 leading-8">
            These Terms shall be governed and interpreted in accordance with the
            laws applicable in your jurisdiction.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t border-white/10 pt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          <div className="space-y-3 text-gray-300">
            <p>Email: info@confexmeet.com</p>
            <p>Phone: +91 7975 429 127</p>
            <p>Website: www.iotsecworldsummit.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}