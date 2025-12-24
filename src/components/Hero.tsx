export const Hero = () => {
    return (
        <section style={{ padding: 'var(--space-8) 0', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{
                    fontSize: '3.5rem',
                    fontWeight: 800,
                    marginBottom: 'var(--space-4)',
                    background: 'linear-gradient(to right, #fff, #a1a1aa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Build Something Amazing
                </h2>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto var(--space-6)'
                }}>
                    A premium starting point for your next great React application, powered by Vite and modern CSS.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="btn">Get Started</button>
                    <button className="btn" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                        Documentation
                    </button>
                </div>
            </div>
        </section>
    );
};
