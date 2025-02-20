import DarkModeToggle from "@/components/DarkModeToggle";
import "../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <DarkModeToggle />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
