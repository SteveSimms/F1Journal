import React from 'react';
import { Link } from 'react-router-dom';
import { CareerStep } from '../data/careerData';
import { ChevronRight, Trophy } from 'lucide-react';

interface ResultCardProps {
    step: CareerStep;
}

export const ResultCard: React.FC<ResultCardProps> = ({ step }) => {
    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <span className="font-display" style={{
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--f1-red)',
                        fontWeight: 700
                    }}>
                        {step.ageRange}
                    </span>
                    <h3 className="font-display" style={{ fontSize: '1.8rem', margin: '0.5rem 0', lineHeight: 1.2 }}>{step.title}</h3>
                </div>
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Trophy size={20} color="var(--f1-silver)" />
                </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.95rem' }}>
                {step.description}
            </p>

            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '1.2rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', color: '#4ade80' }}>
                    {/* <DollarSign size={18} style={{ marginRight: '0.5rem' }} /> */}
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{step.costEstimate}</span>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                    <div style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        marginBottom: '0.4rem',
                        color: 'var(--f1-silver)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Requirements
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {step.requirements.slice(0, 2).map((req, idx) => (
                            <li key={idx} style={{ marginBottom: '0.25rem' }}>{req}</li>
                        ))}
                        {step.requirements.length > 2 && <li style={{ opacity: 0.7 }}>+{step.requirements.length - 2} more...</li>}
                    </ul>
                </div>
            </div>

            <Link to={`/step/${step.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', textDecoration: 'none' }}>
                View Details <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
            </Link>
        </div>
    );
};
