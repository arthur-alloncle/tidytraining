import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import { Form, Popover, PopoverContent, PopoverTrigger, addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiFolderPlus } from "react-icons/hi2";

export const Navbar = () => {
  // Création de projet, probablement à bouger ailleurs plus tard
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (body: {[k: string]: FormDataEntryValue}) => {
        axios
        .post("http://localhost/project/", body)
        .then((res) => {
          addToast({
            title: "C'est parti !",
            description: "Le projet de cours a bien été créé",
            color: "success"
          })
          
          navigate(`/projet/${res.data.courseProject.id}`, {
            state: { isOpen: true }
          })
        }).catch((error) => {
          console.warn(error)
          addToast({
            title: "Une erreur est survenue",
            description: "Le projet n'a pas été créé",
            color: "danger"
          })
        })

    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = Object.fromEntries(new FormData(e.currentTarget));
    mutation.mutate(body)
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">TidyTraining</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Popover>
            <PopoverTrigger>
              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                startContent={<HiFolderPlus className="text-xl text-success"  />}
                variant="flat"
              >
                
                Nouveau projet
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px]">
              <div className="px-1 py-2 w-full">
                <div className="mt-2 flex flex-col gap-2 w-full">
                  <Form onSubmit={onSubmit}>
                    <Input
                      label="Nom du projet"
                      name="title"
                      type="text"
                      size="sm"
                      variant="bordered"
                    />
                    <Button type="submit">Créer</Button>
                    <Input
                      name="user"
                      type='hidden'
                      readOnly
                      value={'2'} // HARD CODED
                    />
                  </Form>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
