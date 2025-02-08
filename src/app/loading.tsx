export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-opacity-20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
