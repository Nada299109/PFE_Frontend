import { ExampleCard } from '@/modules/example';

export default function ExamplePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Example Feature</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExampleCard
          title="Card 1"
          description="This is an example card component"
          variant="primary"
        />
        <ExampleCard
          title="Card 2"
          description="Demonstrating reusable components"
          variant="secondary"
        />
        <ExampleCard
          title="Card 3"
          description="With proper TypeScript typing"
          variant="primary"
        />
      </div>
    </main>
  );
}
