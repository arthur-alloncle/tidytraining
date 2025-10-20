import DefaultLayout from "@/layouts/default";
import { Button, Card, CardBody, CardHeader, Form, Input } from "@heroui/react";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-100">
        <Card isBlurred>
          <CardHeader>Welcome back !</CardHeader>
          <CardBody>
            <Form>
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
