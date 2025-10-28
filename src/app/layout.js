import "./globals.css";
import AuthProvider from "@/contexts/AuthContext";

export const metadata = {
  title: "DevEng",
  description: "English learning platform",
  icons: {
    icon: "/favicon.svg", // can also use multiple sizes or types here
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
