export default function Creative() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">Creative Corner</h1>
      <p className="text-lg text-gray-600 mb-8">
        Novels, games, and other creative endeavors.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-2">Writing</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-2">Games</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}
