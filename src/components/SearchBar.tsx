import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-container" style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem' }}>
            <div style={{ position: 'relative' }}>
                <Search
                    size={24}
                    color="var(--f1-red)"
                    style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                />
                <input
                    type="text"
                    placeholder="Search career steps (e.g., 'karting', 'cost', 'license')..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1.5rem 1.5rem 1.5rem 4rem',
                        fontSize: '1.1rem',
                        backgroundColor: 'rgba(31, 31, 39, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '50px',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--f1-red)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 24, 1, 0.3)';
                        e.target.style.transform = 'scale(1.02)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                        e.target.style.transform = 'scale(1)';
                    }}
                />
            </div>
        </div>
    );
};
