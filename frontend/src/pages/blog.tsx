import { title } from "@/components/primitives";
import { useLocation } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { HiCog } from "react-icons/hi2";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const location = useLocation();
  const url = location.pathname.split("/");
  const id = url[url.length - 1];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isNewProject, setIsNewProject] = useState<boolean>();

  interface ICourseProject {
    data: {
      id: number;
      title: string;
    };
  };

  useEffect(() => {
    if (location.state?.isOpen) {
      onOpen();
      return;
    }
  }, [])


  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["getProject"],
    queryFn: async () => {
      try {
        const res = await axios.get<
          ICourseProject,
          AxiosResponse<ICourseProject>
        >("http://localhost/project/" + id);
        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    refetchOnMount: false,
  });

  return (
    <DefaultLayout>
      <Drawer backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Paramètres du projet
              </DrawerHeader>
              <DrawerBody></DrawerBody>
              <DrawerFooter>
                <Button color="primary" onPress={onClose}>
                  Enregistrer
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <section className="flex flex-col gap-4 py-8 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className={title()}>{data?.data.title}</h1>
          <Button className="text-3xl" isIconOnly onPress={onOpen}>
            <HiCog />
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
