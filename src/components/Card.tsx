interface CardProps {
    title: string;
    description: string;
}

export const Card = ({ title, description }: CardProps) => {
    return (
        <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            transition: 'var(--transition)'
        }}>
            <h3 style={{ marginBottom: 'var(--space-2)', fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
        </div>
    );
};
