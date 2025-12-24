import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Card } from './components/Card';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="container" style={{ padding: 'var(--space-8) 0' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-4)'
          }}>
            <Card
              title="Modern Stack"
              description="Built with Vite, React 18, and TypeScript for a robust development experience."
            />
            <Card
              title="Premium Design"
              description="Styled with Vanilla CSS variables for easy theming and dark mode support."
            />
            <Card
              title="Extensible"
              description="A clean component structure that's easy to build upon and scale."
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
