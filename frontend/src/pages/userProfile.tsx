import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default"
import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const UserProfilePage = () => {
    const url = location.pathname.split("/");
    const id = 5; // !!! Hard coded id = 5 !!! (forecast TT-31)
        const { isPending, error, data, isFetching } = useQuery({
            queryKey: ["findUserById"],
            queryFn: async () => {
                try {
                    const res = await axios.get(`http://localhost/me/${id}`);
                    return res.data;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            },
            refetchOnMount: false,
        });

    console.log(data);
    

    return (
        <DefaultLayout>
            <h1 className={title()}>Bienvenue {data && data.data.first_name}</h1>
            <div>
                <h2 className={title({size: 'sm'})}>Mes informations personnelles</h2>
                {data && 
                 <ul>
                    <li>Prénom : {data.data.first_name}</li>
                    <li>Nom : {data.data.last_name}</li>
                    <li>Email : {data.data.email}</li>
                 </ul>
                }
               
            </div>
        </DefaultLayout>
    )
}