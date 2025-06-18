interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="py-12 md:py-16 text-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container">
        <h1 className="font-headline text-5xl md:text-7xl text-primary mb-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          {title}
        </h1>
        {description && (
          <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
