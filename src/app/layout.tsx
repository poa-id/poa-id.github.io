import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const disketBold = localFont({
  src: '../../public/fonts/Disket-Mono-Bold.ttf',
  variable: '--font-disket-bold',
});

const disketRegular = localFont({
  src: '../../public/fonts/Disket-Mono-Regular.ttf',
  variable: '--font-disket',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Pedro Ossorio Arana - Product Designer",
  description: "Product Designer with a passion for creating user-centered digital experiences",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${disketBold.variable} ${disketRegular.variable}`}>
      <body className="font-montserrat antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
