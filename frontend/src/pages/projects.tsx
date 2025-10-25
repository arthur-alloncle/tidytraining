import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Button,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CardBody,
  Card,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { HiEye, HiLink, HiTrash } from "react-icons/hi2";
import { format } from "date-fns";
import { getUserId } from "@/utils/userId";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ProjectsPage() {
  interface ICourseProject {
    title: string;
    id: number;
    user: number;
    created_at: string;
  }

  const userId = getUserId();

  console.log(userId)

  // Forecast : manage states
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["getProject"],
    queryFn: async () => {
      const res = await fetch(`http://localhost/project/me/${userId}`, {
        method: "GET",
      });

      return await res.json();
    },
    refetchOnMount: false,
  });

  const columns = [
    {
      key: "title",
      label: "Titre",
    },
    {
      key: "status",
      label: "Statut",
    },
    {
      key: "createdAt",
      label: "Créé le",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <DefaultLayout>
      {isPending && "loading..."}
      {isFetching && "???"}
      {error && "error"}

      <section className="flex flex-col gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Mes projets</h1>
        </div>
        <section>
          <Card isBlurred>
            <CardBody>
              {data && (
                <Table removeWrapper aria-label="Tous les projets">
                  <TableHeader columns={columns}>
                    {(col) => (
                      <TableColumn key={col.key}>{col.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={data.data}>
                    {(item: ICourseProject) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>
                          {format(item.created_at, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-4 justify-left">
                            <Button
                              isIconOnly
                              as={Link}
                              href={"projet/" + item.id}
                            >
                              <HiEye />
                            </Button>
                            <Button isIconOnly>
                              <HiTrash />
                            </Button>
                            <Button isIconOnly>
                              <HiLink />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </Card>
        </section>
      </section>
    </DefaultLayout>
  );
}
