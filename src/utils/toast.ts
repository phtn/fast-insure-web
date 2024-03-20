import type { AuthError, User } from "firebase/auth";
import { toast } from "sonner";

export const onSuccess = (...args: string[]) => {
  toast.success(args[0], {
    description: args[1],
  });
};

export const onError = (...args: string[]) => {
  toast.error(args[0], {
    description: args[1],
  });
};

export const onInfo = (...args: string[]) => {
  toast.info(args[0], {
    description: args[1],
  });
};

export const onWarn = (...args: string[]) => {
  toast.warning(args[0], {
    description: args[1],
  });
};

type OnPromise<T> = [
  Promise<T>,
  string,
  string,
  string,
  AuthError | Error | undefined,
];

export const onPromise = <T,>(...args: OnPromise<T>) => {
  toast.promise<T>(args[0], {
    loading: args[1],
    success: (data) => {
      switch (args[2]) {
        case "signout":
          return `You're logged out.`;
        case "signin":
          return (() => {
            if (data !== null && typeof data === "object" && "user" in data) {
              const user = data.user as User;
              if (
                (user satisfies User) &&
                "email" in user &&
                user.email !== ""
              ) {
                return `Signed in as ${user.email}`;
              }
            }
            return `Sign in successful!`;
          })();
        default:
          return args[3];
      }
    },
    error: args[4]?.message,
  });
};
