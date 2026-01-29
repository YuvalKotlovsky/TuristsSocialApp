import { ROUTES } from "@/constants/routes";
import { useAppDispatch } from "@/services/hooks";
import { logout } from "@/services/reducers/auth";
import { useNavigate } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";
import { LogOut, PlusSquare, User } from "lucide-react";

export const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border z-50 pb-safe">
      <div className="max-w-97.5 mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left */}
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-muted-foreground"
            aria-label="Home"
            onClick={() => navigate(ROUTES.HOME)}
          >
            <HomeIcon className="size-6" />
            <span className="text-xs">Home</span>
          </button>

          {/* Center */}
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-muted-foreground"
            aria-label="Create"
            onClick={() => navigate(ROUTES.CREATE_POST)}
          >
            <PlusSquare className="size-6" />
            <span className="text-xs">Create</span>
          </button>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex flex-col items-center gap-1 text-primary"
              aria-label="Profile"
              onClick={() => navigate(ROUTES.PROFILE)}
            >
              <User className="size-6" />
              <span className="text-xs">Profile</span>
            </button>

            <button
              type="button"
              aria-label="Logout"
              onClick={handleLogout}
              className="text-destructive hover:opacity-80"
            >
              <LogOut className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
