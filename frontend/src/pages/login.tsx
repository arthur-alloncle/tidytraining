import DefaultLayout from "@/layouts/default";
import { Button, Card, CardBody, CardHeader, Form, Input } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import { api,setAccessToken } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (body: Record<string, FormDataEntryValue>) => {
      const { data } = await api.post("http://localhost/auth/login", body)
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('userId', JSON.stringify(data.data.user.id))
      const accessToken = data.data.accessToken;
      // store access token (in-memory or localStorage)
      localStorage.setItem('accessToken', accessToken);
      setAccessToken(accessToken);

      navigate('/me')
    }

  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: {[k: string]: FormDataEntryValue} = Object.fromEntries(new FormData(e.currentTarget));

    mutation.mutate(body)
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-100">
        <Card isBlurred>
          <CardHeader>Welcome back !</CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
                <Input
                    label="Email"
                    name="email"
                    type="text"
                    size="sm"
                    variant="bordered"
                />
                <Input
                    label="Mot de passe"
                    name="password"
                    type="password"
                    size="sm"
                    variant="bordered"
                />
                <Button type="submit">Login</Button>

            </Form>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
