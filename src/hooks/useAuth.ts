import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../contexts/auth";

export function useAuth() {
  const user = useContextSelector(AuthContext, (auth) => auth.user);
  const handleSignInWithGoogle = useContextSelector(
    AuthContext,
    (auth) => auth.handleSignInWithGoogle
  );

  return {
    user,
    handleSignInWithGoogle,
  };
}
