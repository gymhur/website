const steps = [
  { step: '01', title: 'Request a Quote', description: 'Fill out our form or message us on WhatsApp with your requirements.' },
  { step: '02', title: 'Receive a Sample', description: 'We produce a sample for your approval before full production.' },
  { step: '03', title: 'Approve & Confirm', description: 'Review the sample, request any changes, then confirm your order.' },
  { step: '04', title: 'Production & Delivery', description: 'We produce your order and ship directly to your door.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">How It Works</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          From first contact to delivery — a simple, transparent process.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.step} className="text-center">
              <div className="text-4xl font-extrabold text-brand/20 mb-3">{s.step}</div>
              <h3 className="font-semibold text-text-primary mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
