import { type AuthError } from "firebase/auth";
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

type OnPromise = [Promise<boolean>, string, AuthError | Error | undefined]

export const onPromise = (...args: OnPromise) => {
  toast.promise(args[0], {
    loading: args[1],
    success: (data) => data,
    error: args[2]?.message
  })
}
