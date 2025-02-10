export interface ErrorComponentProps {
  readonly error: Error & { digest?: string }; // Mark 'error' as readonly
  readonly reset: () => void; // Mark 'reset' as readonly
}
