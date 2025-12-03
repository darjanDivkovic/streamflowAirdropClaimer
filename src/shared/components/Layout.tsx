import type { JSX } from 'react';

export function Layout ({ children }: { children: JSX.Element }) {
    return (
        <div className="px-[10%] h-[100vh] relative overflow-hidden">
            {children}

            <div className="absolute left-[-20vh] bottom-[-20vh] w-[70vh] h-[70vh] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,_#C297FA_0%,_rgba(194,151,250,0)_100%)] z-[-1]" />
            <div className="absolute right-[-20vh] top-[-20vh] w-[70vh] h-[70vh] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle_at_center,_#C297FA_0%,_rgba(194,151,250,0)_100%)] z-[-1]" />
        </div>
    )
}