'use client';

interface ContentSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const ContentSection = ({
  title,
  children,
  className = '',
}: ContentSectionProps) => {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      )}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
};

export default ContentSection;
