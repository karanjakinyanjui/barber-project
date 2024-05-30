import NavBar from "@/components/nav/NavBar";
import "./globals.css";
import Sidebar from "@/components/nav/Sidebar";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Barbershop Management System",
  description:
    "A web application for managing a barbershop, allowing barbers to claim transactions, and administrators to oversee operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="mt-16 min-h-screen w-full overflow-x-hidden bg-gray-700 dark:bg-black pt-6">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
