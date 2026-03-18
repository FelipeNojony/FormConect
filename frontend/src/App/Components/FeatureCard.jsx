export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white border rounded-2xl p-6 flex gap-4 items-start">
      <div className="text-2xl">{icon}</div>

      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}