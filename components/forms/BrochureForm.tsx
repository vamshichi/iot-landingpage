export default function BrochureForm() {
  return (
    <form className="space-y-6 bg-white p-8 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold">Download Brochure</h2>

      <input placeholder="Full Name*" className="input" />
      <input placeholder="Job Title*" className="input" />
      <input placeholder="Company Name*" className="input" />
      <input placeholder="Email*" className="input" />
      <input placeholder="Mobile*" className="input" />

      <select className="input">
        <option>Industry</option>
        <option>Cybersecurity</option>
        <option>IoT</option>
      </select>

      <button className="btn-primary">Download</button>
    </form>
  );
}