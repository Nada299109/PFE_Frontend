import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExampleCardProps {
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function ExampleCard({
  title,
  description,
  variant = 'primary',
  className,
}: ExampleCardProps) {
  const handleClick = () => {
    console.log(`${title} clicked`);
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md',
        variant === 'primary'
          ? 'border-blue-200 bg-blue-50'
          : 'border-gray-200 bg-gray-50',
        className
      )}
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Button
        variant={variant === 'primary' ? 'primary' : 'secondary'}
        size="sm"
        onClick={handleClick}
      >
        Learn More
      </Button>
    </div>
  );
}
