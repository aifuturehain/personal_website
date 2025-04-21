import './globals.css';
import Navbar from '../components/Navbar';
import { montserrat, poppins } from './fonts';

export const metadata = {
  title: 'Abhilash Rajan - Portfolio',
  description: 'A personal portfolio website showcasing my work and expertise in general management and AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="flex h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}