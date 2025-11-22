import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { careerPath } from '../data/careerData';
import { ArrowLeft, DollarSign, Trophy, CheckCircle, Lightbulb } from 'lucide-react';

export const DetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const step = careerPath.find(s => s.id === id);

    if (!step) {
        return (
            <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Step Not Found</h2>
                <Link to="/" className="btn btn-primary">
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Grid
                </Link>
            </div>
        );
    }

    return (
        <div className="container animate-enter" style={{ paddingBottom: '4rem' }}>
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                marginBottom: '2rem',
                marginTop: '2rem',
                fontWeight: 600,
                transition: 'color 0.2s'
            }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--f1-white)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
                <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Grid
            </Link>

            <div className="card" style={{ padding: '3rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '2rem'
                }}>
                    <div>
                        <span className="font-display" style={{
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            color: 'var(--f1-red)',
                            fontWeight: 700,
                            display: 'block',
                            marginBottom: '0.5rem'
                        }}>
                            {step.ageRange}
                        </span>
                        <h1 className="font-display" style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '1rem' }}>
                            {step.title}
                        </h1>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <span style={{
                                padding: '0.4rem 1rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '20px',
                                fontSize: '0.9rem',
                                fontWeight: 600
                            }}>
                                {step.category}
                            </span>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'rgba(31, 31, 39, 0.6)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        minWidth: '250px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4ade80' }}>
                            <DollarSign size={24} style={{ marginRight: '0.5rem' }} />
                            <span style={{ fontWeight: 700, fontSize: '1.5rem' }}>Cost Estimate</span>
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{step.costEstimate}</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    <div>
                        <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            <Trophy size={24} color="var(--f1-red)" style={{ marginRight: '0.75rem' }} /> Overview
                        </h3>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                            {step.description}
                        </p>

                        <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
                            <CheckCircle size={24} color="var(--f1-red)" style={{ marginRight: '0.75rem' }} /> Requirements
                        </h3>
                        <ul style={{ listStyle: 'none' }}>
                            {step.requirements.map((req, idx) => (
                                <li key={idx} style={{
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span style={{
                                        width: '6px',
                                        height: '6px',
                                        backgroundColor: 'var(--f1-red)',
                                        borderRadius: '50%',
                                        marginTop: '10px',
                                        marginRight: '1rem',
                                        flexShrink: 0
                                    }} />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div style={{
                            backgroundColor: 'rgba(255, 24, 1, 0.05)',
                            border: '1px solid rgba(255, 24, 1, 0.2)',
                            borderRadius: '12px',
                            padding: '2rem'
                        }}>
                            <h3 className="font-display" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', color: 'var(--f1-white)' }}>
                                <Lightbulb size={24} color="var(--f1-red)" style={{ marginRight: '0.75rem' }} /> Pro Tips
                            </h3>
                            <ul style={{ listStyle: 'none' }}>
                                {step.tips.map((tip, idx) => (
                                    <li key={idx} style={{
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'flex-start'
                                    }}>
                                        <span style={{
                                            color: 'var(--f1-red)',
                                            fontWeight: 900,
                                            marginRight: '1rem',
                                            fontFamily: 'var(--font-display)'
                                        }}>
                                            0{idx + 1}
                                        </span>
                                        <span style={{ color: 'var(--text-secondary)' }}>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
