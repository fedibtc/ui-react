import { useToast, Text, Button } from "@fedibtc/ui"
import Container from "../components/container"

export default function Toasts() {
  const toast = useToast()

  return (
    <Container title="Toast">
      <Text variant="h2">Toast</Text>
      <Button
        onClick={() =>
          toast.show({ content: "Success toast", status: "success" })
        }
      >
        Success
      </Button>
      <Button
        onClick={() => toast.show({ content: "Info toast", status: "success" })}
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast.show({ content: "Error toast", status: "success" })
        }
      >
        Error Toast
      </Button>
    </Container>
  )
}
