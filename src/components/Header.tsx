export const Header = () => {
    return (
        <header style={{ borderBottom: '1px solid var(--border)', padding: 'var(--space-4) 0' }}>
            <div className="container flex justify-between items-center">
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Bayes App</h1>
                <nav>
                    <ul className="flex gap-4" style={{ listStyle: 'none' }}>
                        <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Features</a></li>
                        <li><a href="#" style={{ color: 'var(--text-secondary)' }}>Pricing</a></li>
                        <li><a href="#" style={{ color: 'var(--text-secondary)' }}>About</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
