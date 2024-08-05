interface Window {
    electron: {
        minimize: () => void;
        close: () => void;
        maximize: () => void;
        doubleClickTitleBar: () => void;
    };
}
