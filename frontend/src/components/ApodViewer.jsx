import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

const ApodViewer = () => {
  const [data, setData] = useState(null);
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const fetchApod = async (selectedDate = '') => {
    const query = selectedDate ? `?date=${selectedDate}` : '';
    try {
      const res = await fetch(`${API_BASE_URL}/api/apod${query}`);
      if (!res.ok) throw new Error('Failed to fetch APOD');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message || 'Unknown error');
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setDate(selected);
    fetchApod(selected);
  };

  if (error)
    return (
      <p className="text-red-400 text-center mt-4">
        ⚠️ Error fetching data: {error}
      </p>
    );

  if (!data)
    return <p className="text-gray-400 text-center mt-4">Loading...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Astronomy Picture of the Day 🌌
      </h2>

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="bg-gray-700 text-white px-3 py-1 rounded-md mb-4"
      />

      <div className="w-full flex flex-col items-center">
        {data.media_type === 'image' ? (
          <img
            src={data.url}
            alt={data.title}
            className="rounded-lg max-w-full md:max-w-2xl"
          />
        ) : (
          <iframe
            title="space-video"
            src={data.url}
            className="mx-auto"
            allowFullScreen
            width="500"
            height="300"
          />
        )}

        <p className="mt-4 text-justify max-w-3xl text-white">
          {data.explanation}
        </p>
      </div>
    </div>
  );
};

export default ApodViewer;
