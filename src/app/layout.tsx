import { ReactNode } from 'react';
import RQProvider from './_components/RQProvider';
import { MSWComponent } from './_components/MSWComponent';

import lightTheme from '../themes/lightTheme';
import './globals.css';
import Navigation from '@/components/organisms/Navigation/Navigation';
// import darkTheme from '../themes/darkTheme';
// import { ThemeProvider } from 'styled-components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider theme={lightTheme}> */}
        <RQProvider>
          <MSWComponent />

          <Navigation>네브바</Navigation>
          <div>
            본문래퍼
            <div>사이드바</div>
            {children}
          </div>
        </RQProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
