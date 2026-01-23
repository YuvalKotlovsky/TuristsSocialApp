import { Home, PlusSquare, User } from "lucide-react";
export const Footer = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="max-w-97.5 mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-muted-foreground"
            aria-label="Home"
          >
            <Home className="size-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-muted-foreground"
            aria-label="Create"
          >
            <PlusSquare className="size-6" />
            <span className="text-xs">Create</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-primary"
            aria-label="Profile"
          >
            <User className="size-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
