import DefaultLayout from "@/layouts/default";
import { Button, Card, CardBody } from "@heroui/react";

export default function IndexPage() {
  // if (isPending) return 'Loading...';
  // if (error) return error.message;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-100">
        <Card isBlurred>
          <CardBody>
            <div className="flex p-5">
              <Button>Démarrez maintenant</Button>
              <Button>Connectez-vous</Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </DefaultLayout>
  );
}
