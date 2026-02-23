import { type NavigateFunction } from 'react-router-dom';

class Navigation {
    private navigate: NavigateFunction | null = null;

    public navigateTo = async (path: string): Promise<void> => {
        if (!this.navigate) {
            return;
        }

        await this.navigate(path);
    };

    public setNavigate = (navigate: NavigateFunction): void => {
        this.navigate = navigate;
    };
}

export { Navigation };
