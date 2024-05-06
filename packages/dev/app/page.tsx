"use client"

import Typography from "./playground/typography"
import Buttons from "./playground/buttons"
import FormFields from "./playground/form-fields"
import Avatars from "./playground/avatars"
import Toasts from "./playground/toasts"
import Dialogs from "./playground/dialogs"
import { Icon, Text, useFediInjectionContext } from "@fedibtc/ui"
import Container from "./components/container"
import NostrExample from "./playground/nostr"
import WebLNExample from "./playground/webln"

function App() {
  const { status, isLoading, error } = useFediInjectionContext()

  let content = (
    <>
      <Typography />
      <Buttons />
      <FormFields />
      <Avatars />
      <Toasts />
      <Dialogs />
      <WebLNExample />
      <NostrExample />
    </>
  )

  if (isLoading) {
    content = (
      <Container title="Loading WebLN...">
        <Icon icon="IconLoader2" className="animate-spin" />
        <Text>{status}</Text>
      </Container>
    )
  }

  if (error) {
    content = (
      <Container title="An Error Occurred">
        <Text>{error.message}</Text>
      </Container>
    )
  }

  return (
    <div className="w-full min-h-screen bg-holo-400 flex justify-center">
      <div className="min-h-full max-w-[480px] w-full flex flex-col gap-4 grow">
        <div className="py-6 px-2 rounded-4 flex flex-col gap-4 grow items-stretch w-full">
          {content}
        </div>
      </div>
    </div>
  )
}

export default App
