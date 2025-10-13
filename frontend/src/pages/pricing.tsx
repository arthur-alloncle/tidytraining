import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Form, Input, Button } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

interface ICourseProject {
  title: string;
  id: number
}

export default function DocsPage() {
  const [submitted, setSubmitted]: any = useState(null);
  const [courseProject, setCourseProject] = useState<ICourseProject>();
  const navigate = useNavigate();

  // const mutation = useMutation({
  //   mutationFn: async (body: {[k: string]: FormDataEntryValue}) => {
  //       axios
  //       .post("http://localhost/project/", body)
  //       .then((res) => {
  //         setCourseProject(res.data.courseProject)
  //         addToast({
  //           title: "C'est parti !",
  //           description: "Le projet de cours a bien été créé",
  //           color: "success"
  //         })
  //         navigate(`/blog/${res.data.courseProject.id}`)
  //       }).catch((error) => {
  //         console.warn(error)
  //         addToast({
  //           title: "Une erreur est survenue",
  //           description: "Le projet n'a pas été créé",
  //           color: "danger"
  //         })
  //       })

  //   },
  // });

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const body = Object.fromEntries(new FormData(e.currentTarget));
  //   setSubmitted(body)
  //   mutation.mutate(body)
  // };

  return (
    <DefaultLayout>
      {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Nouveau projet</h1>
        </div>
      </section>
      <section>
        <div className="">
          <Form onSubmit={onSubmit}>
            <Input label="Nom du projet" name="title" type="text" />
            <Button type="submit">Créer</Button>
          </Form>
        </div>
      </section> */}
    </DefaultLayout>
  );
}
