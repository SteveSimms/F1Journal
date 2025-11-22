import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { DetailPage } from './pages/DetailPage';
import { careerPath } from './data/careerData';
import { Flag, Info } from 'lucide-react';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSteps = careerPath.filter(step => {
    const term = searchTerm.toLowerCase();
    return (
      step.title.toLowerCase().includes(term) ||
      step.description.toLowerCase().includes(term) ||
      step.category.toLowerCase().includes(term) ||
      step.requirements.some(req => req.toLowerCase().includes(term))
    );
  });

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

      {/* Search */}
      <div className="animate-enter delay-2">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Results */}
      <div className="animate-enter delay-3" style={{ marginBottom: '2rem' }}>
        <h3 className="font-display" style={{
          fontSize: '1.5rem',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          borderLeft: '4px solid var(--f1-red)',
          paddingLeft: '1rem',
          textTransform: 'uppercase'
        }}>
          {searchTerm ? `Search Results (${filteredSteps.length})` : 'Career Progression Path'}
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '2rem'
      }}>
        {filteredSteps.map((step, index) => (
          <div key={step.id} className={`animate-enter`} style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}>
            <ResultCard step={step} />
          </div>
        ))}
      </div>

      {filteredSteps.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No results found for "{searchTerm}". Try searching for "karting" or "license".</p>
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
