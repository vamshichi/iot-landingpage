import Image from "next/image";

export default function OrganizerBadge() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg border border-gray-200">
      
      <p className="text-xs text-gray-600 whitespace-nowrap">
        Event Organised by:
      </p>

      <Image
        src="/confex.png" // put logo in public folder
        alt="ConfexMeet Logo"
        width={120}
        height={40}
        className="object-contain"
      />
    </div>
  );
}