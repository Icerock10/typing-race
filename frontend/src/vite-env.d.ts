/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?react' {
    const Component: React.FC<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    /* eslint-disable import/no-default-export */
    export default Component;
}
