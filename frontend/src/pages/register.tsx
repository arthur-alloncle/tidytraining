import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { Button, Card, CardBody, Form, Input, addToast } from "@heroui/react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  useEffect(() => {
    if (password === confirmPassword && password.length > 0) {
      setIsPasswordMatch(true);
      return;
    }
    setIsPasswordMatch(false);
  }, [confirmPassword]);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (body: {[k: string]: FormDataEntryValue}) => {
        axios
        .post("http://localhost/auth/register", body)
        .then((res) => {
          console.log(body);
          
          addToast({
            title: `Enchanté ${res.data.first_name} !`,
            description: "Votre compte a bien été créé",
            color: "success"
          })
          console.log(res);


          
          
          navigate(`/me`, {
            state: { id: res.data.id, firstName: res.data.first_name }
          })
        }).catch((error) => {
          console.warn(error)
          // addToast({
          //   title: "Une erreur est survenue",
          //   description: "Le projet n'a pas été créé",
          //   color: "danger"
          // })
        })
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = Object.fromEntries(new FormData(e.currentTarget));
    delete body.confirmPassword;
    mutation.mutate(body)
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4 py-8 md:py-10">
        <div className="flex items-center justify-between">
          <h1 className={title()}>Créer un compte TidyTraining</h1>
        </div>
      </section>
      <section className="max-w-lg">
        <Card isBlurred>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <Input
                isRequired
                label="Prénom"
                variant="bordered"
                name="firstName"
                type="text"
                value={firstName}
                onValueChange={setFirstName}
              />
              <Input
                isRequired
                label="Nom"
                variant="bordered"
                name="lastName"
                type="text"
                value={lastName}
                onValueChange={setLastName}
              />
              <Input
                isRequired
                label="Adresse email"
                variant="bordered"
                name="email"
                type="email"
                value={email}
                onValueChange={setEmail}
              />
              <Input
                isRequired
                label="Mot de passe"
                variant="bordered"
                name="password"
                type="password"
                value={password}
                onValueChange={setPassword}
              />
              <Input
                isRequired
                isInvalid={!isPasswordMatch && confirmPassword.length > 0}
                label="Confirmer le mot de passe"
                variant="bordered"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onValueChange={setConfirmPassword}
              />
              <div className="text-right w-lg px-7">
                <Button type="submit" color="primary">
                  Enregistrer
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
};

