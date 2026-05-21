import QRScanner from "@/components/QRScanner";

export default function CheckInPage() {

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Event Check-In
      </h1>

      <QRScanner />

    </div>
  );
}