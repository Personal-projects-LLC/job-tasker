'use client';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  className = '',
}: PageHeaderProps) => {
  return (
    <div className={`space-y-2 pb-8 pt-6 md:pt-8 ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
