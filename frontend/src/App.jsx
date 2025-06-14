import ApodViewer from './components/ApodViewer';
import MarsViewer from './components/MarsViewer';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        NASA Explorer 🚀
      </h1>

      <div className="space-y-16 max-w-5xl mx-auto">
        <ApodViewer />
        <MarsViewer />
      </div>
    </div>
  );
}

export default App;
