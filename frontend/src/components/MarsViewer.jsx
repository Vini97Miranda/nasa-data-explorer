import { useState } from 'react';
import { API_BASE_URL } from '../config';

const MarsViewer = () => {
  const [date, setDate] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/mars?date=${date}`);
      if (!res.ok) throw new Error("Failed to fetch Mars photos");
      const data = await res.json();
      setPhotos(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setPhotos([]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center mt-12">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Mars Rover Photos 🛸
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded-md"
        />
        <button
          onClick={fetchPhotos}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md text-white"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-center mb-4">{error}</p>
      )}

      {photos.length === 0 && !error && (
        <p className="text-gray-400 text-center">
          No photos available for this date.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 w-full max-w-6xl">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-gray-700 rounded-lg overflow-hidden shadow flex flex-col items-center p-2"
          >
            <img
              src={photo.img_src}
              alt={`Mars photo by ${photo.camera.full_name}`}
              className="w-full max-w-md mx-auto rounded"
            />
            <p className="p-2 text-sm text-center text-white">
              {photo.camera.full_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsViewer;
