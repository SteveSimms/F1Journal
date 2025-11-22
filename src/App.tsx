import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { DetailPage } from './pages/DetailPage';
import { CareerMindMap } from './components/CareerMindMap';
import { searchCareerInfo, generateCareerPath, SearchResult, CareerStep } from './api';
import { Flag, Info, Map, List, Zap } from 'lucide-react';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mindMapSteps, setMindMapSteps] = useState<CareerStep[]>([]);

  // Debounced Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        setLoading(true);
        const data = await searchCareerInfo(searchTerm);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleGeneratePath = async () => {
    setLoading(true);
    setViewMode('map');
    // Hardcoded profile for demo - in real app, get from user input
    const pathData = await generateCareerPath(12, 50000, "USA");
    if (pathData) {
      setMindMapSteps(pathData.suggested_path);
    }
    setLoading(false);
  };

  return (
    <main className="container">
      {/* Hero Section */}
      <div className="animate-enter delay-1 hero-pattern" style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
        <h2 className="font-display" style={{
          fontSize: '4rem',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '-1px'
        }}>
          Your Journey to <br />
          <span style={{
            color: 'var(--f1-red)',
            textShadow: '0 0 30px rgba(255, 24, 1, 0.3)'
          }}>Formula 1</span> Starts Here
        </h2>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          The comprehensive guide to becoming a professional racing driver, from karting to the podium.
        </p>
      </div>

      {/* Search & Controls */}
      <div className="animate-enter delay-2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setViewMode('list')}
            className="btn"
            style={{
              backgroundColor: viewMode === 'list' ? 'var(--f1-red)' : 'rgba(255,255,255,0.1)',
              color: 'white'
            }}
          >
            <List size={18} style={{ marginRight: '0.5rem' }} /> List View
          </button>
          <button
            onClick={handleGeneratePath}
            className="btn"
            style={{
              backgroundColor: viewMode === 'map' ? 'var(--f1-red)' : 'rgba(255,255,255,0.1)',
              color: 'white'
            }}
          >
            <Map size={18} style={{ marginRight: '0.5rem' }} /> AI Career Map
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="animate-enter delay-3" style={{ marginBottom: '2rem' }}>
        <h3 className="font-display" style={{
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          borderLeft: '4px solid var(--f1-red)',
          paddingLeft: '1rem',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center'
        }}>
          {loading ? (
            <>
              <Zap className="animate-pulse" size={24} color="var(--f1-red)" style={{ marginRight: '0.5rem' }} />
              AI Processing...
            </>
          ) : (
            viewMode === 'map' ? 'Your Personalized Career Path' : `Search Results (${results.length})`
          )}
        </h3>
      </div>

      {viewMode === 'map' ? (
        <div className="animate-enter">
          <CareerMindMap steps={mindMapSteps} />
          <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
            *AI-generated path based on typical progression.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {results.map((step, index) => (
            <div key={index} className={`animate-enter`} style={{ animationDelay: `${0.1 * index}s` }}>
              <ResultCard step={{
                id: step.id || `api-${index}`,
                title: step.title,
                ageRange: step.age_range || 'N/A',
                description: step.description,
                costEstimate: step.cost_estimate || 'Varies',
                requirements: step.requirements || [],
                category: step.category || 'General',
                tips: []
              }} />
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && viewMode === 'list' && searchTerm && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No results found for "{searchTerm}". The AI is thinking...</p>
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* Header */}
      <header style={{
        padding: '1.5rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '4rem',
        background: 'rgba(21, 21, 30, 0.8)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container animate-enter" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--f1-red)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(255, 24, 1, 0.4)'
            }}>
              <Flag color="white" fill="white" size={24} />
            </div>
            <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '1px' }}>
              GRID<span style={{ color: 'var(--f1-red)' }}>PATH</span>
            </h1>
          </div>
          <nav>
            <button className="btn" style={{ color: 'var(--text-secondary)', background: 'transparent' }}>
              <Info size={20} style={{ marginRight: '0.5rem' }} /> About
            </button>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/step/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
