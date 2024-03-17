import { ErrorInfo, ReactNode,Component } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <div>Error...</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
