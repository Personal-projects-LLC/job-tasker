import Header from '../header';
import Footer from '../footer';
import { LayoutProps } from '@/types/components/layout';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-testid="layout-container" className="min-h-screen flex flex-col">
      <Header />
      <main data-testid="layout-main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
