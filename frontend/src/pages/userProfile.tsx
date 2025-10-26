import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useQuery } from "@tanstack/react-query";
import { api, setAccessToken } from "@/lib/api";
import { getUserId } from "@/utils/userId";

export const UserProfilePage = () => {
    const userId = getUserId();
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["findUserById"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
      if (!token) throw new Error("unauthorized");

      if (!token) return;
      const { data } = await api.get(`http://localhost/me`);
      return data;
    },
    refetchOnMount: false,
  });

  console.log(userId);

  return (
    <DefaultLayout>
      {isPending && "loading..."}
      {isFetching && "???"}
      {error && "error"}
      <h1 className={title()}>Bienvenue {data && data.data.first_name}</h1>
      <div>
        <h2 className={title({ size: "sm" })}>Mes informations personnelles</h2>
        {data && (
          <ul>
            <li>Prénom : {data.data.first_name}</li>
            <li>Nom : {data.data.last_name}</li>
            <li>Email : {data.data.email}</li>
          </ul>
        )}
      </div>
    </DefaultLayout>
  );
};
