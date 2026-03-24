interface Point {
  title: string;
  description: string;
}

interface Props {
  points: Point[];
}

const defaultPoints: Point[] = [
  { title: 'Low Minimum Orders', description: 'Start small and scale. We work with brands at every stage.' },
  { title: 'Custom Branding', description: 'Your logo, your labels, your packaging. Full OEM/ODM support.' },
  { title: 'Fast Turnaround', description: 'Efficient production without compromising on quality.' },
];

export default function WhyGymhur({ points }: Props) {
  const items = points.length > 0 ? points : defaultPoints;

  return (
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">Why Gymhur</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          We make custom sportswear manufacturing straightforward for brands worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((point, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-brand text-white flex items-center justify-center font-bold mb-5">
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">{point.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
