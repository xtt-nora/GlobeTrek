import './globals.css'
import {ConvexClientProvider} from "@/providers/convex-client-provider";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
        </html>
    )
}