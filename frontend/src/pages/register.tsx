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
  const errors: string[] = []

  // Confirm password match
  useEffect(() => {
    if (password === confirmPassword && password.length > 0) {
      setIsPasswordMatch(true);
      return;
    }
    setIsPasswordMatch(false);
  }, [confirmPassword]);

  // Validate password schema as described in backend
  if (password.length > 0) {
    if (password.length < 8) {
      errors.push("Votre mot de passe doit contenir au moins 8 caractères");
    }
    if ((password.match(/[A-Z]/g) || []).length < 1) {
      errors.push("Votre mot de passe doit inclure au moins 1 majuscule");
    }

    if ((password.match(/[a-z]/g) || []).length < 1) {
      errors.push("Votre mot de passe doit inclure au moins 1 majuscule");
    }

    if ((password.match(/[0-9]/g) || []).length < 1) {
      errors.push("Votre mot de passe doit inclure au moins 1 chiffre");
    }

  }

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (body: Record<string, FormDataEntryValue>) => {
      const { data } = await axios.post("http://localhost/auth/register", body)
      return data;
    },
    onSuccess: (data) => {
      addToast({
        title: `Enchanté ${data.first_name} 👋`,
        description: "Votre compte a bien été créé",
        color: "success",
      });

      navigate("/me", {
        state: { id: data.id, firstName: data.first_name },
      });
    },
    onError: (error: any) => {
      console.warn(error);
      addToast({
        title: "Une erreur est survenue",
        description: "Impossible de créer le compte",
        color: "danger",
      });
    },
  })

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
                name="first_name"
                type="text"
                value={firstName}
                onValueChange={setFirstName}
              />
              <Input
                isRequired
                label="Nom"
                variant="bordered"
                name="last_name"
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
                errorMessage={() => (
                  <ul>
                    {errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                )}
                isInvalid={errors.length > 0}
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

