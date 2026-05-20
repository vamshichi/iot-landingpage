export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-12">
          Effective Date: May 20, 2026
        </p>

        {/* Section 1 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            We may collect personal and business information when you:
          </p>

          <ul className="list-disc pl-6 text-gray-300 space-y-3">
            <li>Register for events or conferences</li>
            <li>Submit forms through our website</li>
            <li>Subscribe to newsletters</li>
            <li>Contact our support team</li>
            <li>Interact with our website or marketing campaigns</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            We use your information for:
          </p>

          <ul className="list-disc pl-6 text-gray-300 space-y-3">
            <li>Processing event registrations</li>
            <li>Sending event updates and notifications</li>
            <li>Providing customer support</li>
            <li>Improving website functionality</li>
            <li>Marketing and promotional activities</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            3. Cookies & Analytics
          </h2>

          <p className="text-gray-300 leading-8">
            Our website may use cookies and analytics tools to improve user
            experience and analyze website traffic.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            4. Sharing of Information
          </h2>

          <p className="text-gray-300 leading-8 mb-4">
            We do not sell your personal information.
          </p>

          <p className="text-gray-300 leading-8">
            Information may be shared with trusted partners such as payment
            gateways, email providers, event sponsors, and government
            authorities if legally required.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            5. Data Security
          </h2>

          <p className="text-gray-300 leading-8">
            We implement industry-standard security measures to protect your
            personal information from unauthorized access or misuse.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            6. Third-Party Links
          </h2>

          <p className="text-gray-300 leading-8">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of external sites.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            7. Your Rights
          </h2>

          <ul className="list-disc pl-6 text-gray-300 space-y-3">
            <li>Access your personal data</li>
            <li>Request corrections to your information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing communication</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            8. Policy Updates
          </h2>

          <p className="text-gray-300 leading-8">
            We may update this Privacy Policy from time to time. Updates will
            be posted on this page with the revised effective date.
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
            <p>Website:www.iotsecworldsummit.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}