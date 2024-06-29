import { useRouter } from "next/navigation";

export const useTableHooks = () => {
  const router = useRouter();
  const editDraftRoute = (id: string | undefined) => {
    router.push(`/account/requests/${id}`);
  };

  return { editDraftRoute };
};
