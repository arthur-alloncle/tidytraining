import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

import {useMutation, useQuery} from "@tanstack/react-query"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function IndexPage() {

  const {isPending, error, data, isFetching} = useQuery({ 
    queryKey: ['getProject'], 
    queryFn: async () => {
      const res = await fetch('http://localhost/project/')

      
      return await res.json()
    },
    refetchOnMount: false
  })

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('http://localhost/project/', {method: 'POST'})
      return await res.json();
    }
  })
      const log = data?.data.map((p: any) => p.title)
      console.log(data?.data);
      console.log(log);

  // if (isPending) return 'Loading...';
  // if (error) return error.message;


  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Make&nbsp;</span>
          <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
          <br />
          <span className={title()}>
            websites regardless of your design experience.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Beautiful, fast and modern React UI library.
          </div>
        </div>

        <button onClick={ () => {
          //@ts-ignore
          mutation.mutate({
            title: 'Title'
          })
        }}>
          Add
        </button>

        {
          data?.data.map((project: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <div key={project.id}>
              {project.title}
            </div>
          ))
        }

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
