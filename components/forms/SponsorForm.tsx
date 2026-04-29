export default function SponsorForm() {
  return (
    <form className="space-y-6 bg-white p-8 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold">Become a Sponsor</h2>

      {/* Company Info */}
      <input placeholder="Company Name*" className="input" />
      <input placeholder="Website URL*" className="input" />
      <input placeholder="Headquarters Location*" className="input" />

      <select className="input">
        <option>Company Size</option>
        <option>1–50</option>
        <option>51–200</option>
      </select>

      {/* Objectives */}
      <div>
        <p className="font-semibold">Objectives</p>
        {["Brand Visibility", "Lead Generation", "Product Launch"].map((o) => (
          <label key={o}>
            <input type="checkbox" /> {o}
          </label>
        ))}
      </div>

      <textarea placeholder="Custom Requirements" className="input" />

      <button className="btn-primary">Submit</button>
    </form>
  );
}