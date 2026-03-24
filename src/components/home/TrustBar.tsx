const items = ['Founded 2021', 'Sialkot, Pakistan', 'Low MOQs', 'OEM / ODM Options', 'Custom Branding'];

export default function TrustBar() {
  return (
    <div className="border-y border-gray-100 bg-white py-4 overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-text-secondary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
