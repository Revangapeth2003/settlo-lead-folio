import { Link, useLocation } from "react-router-dom";
import { Users, Home, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-hover">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Settlo
              </span>
            </Link>

            <div className="flex gap-2">
              {user && (
                <>
                  <Link
                    to="/"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      location.pathname === "/"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    to="/leads"
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      location.pathname === "/leads"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    Leads
                  </Link>
                  <Button
                    onClick={signOut}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
