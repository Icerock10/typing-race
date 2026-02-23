import { Component, type ErrorInfo, type ReactNode } from 'react';

type State = {
    hasError: boolean;
    errorKey: number;
};

type Properties = {
    children: ReactNode;
    onError?: (error: Error, info: ErrorInfo) => void;
};

class ErrorBoundary extends Component<Properties, State> {
    constructor(properties: Properties) {
        super(properties);
        this.state = { hasError: false, errorKey: 0 };
    }

    static getDerivedStateFromError(): Pick<State, 'hasError'> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        this.props.onError?.(error, info);
    }

    resetError = (): void => {
        const INCREMENT_KEY = 1;
        this.setState({
            hasError: false,
            errorKey: this.state.errorKey + INCREMENT_KEY,
        });
    };

    renderError(): ReactNode {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Something went wrong</h2>
                <button onClick={this.resetError}>Try again</button>
            </div>
        );
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.renderError();
        }
        return <div key={this.state.errorKey}>{this.props.children}</div>;
    }
}

export { ErrorBoundary };
