import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
    variable: "--font-inter-tight",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Zeek",
    description: "AI-powered backend agent and admin dashboard",
    icons: {
        icon: "/favicon.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            className="text-[calc(0.7rem+0.4vw)] max-[2300px]:text-[calc(0.7rem+0.33vw)] max-[2150px]:text-[calc(0.7rem+0.28vw)] max-4xl:text-[1rem]"
            lang="en"
            suppressHydrationWarning
        >
            <head>
                <meta
                    name="description"
                    content="Zeek – Admin Dashboard & Backend Agent"
                />
            </head>
            <body
                className={`${interTight.variable} font-inter-tight text-body-md text-gray-900 antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
