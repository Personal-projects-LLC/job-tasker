import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { ContainerProps } from '@/types/components/container';

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
export default Container;
