"use client"

import Typography from "./playground/typography"
import Buttons from "./playground/buttons"
import FormFields from "./playground/form-fields"
import Avatars from "./playground/avatars"
import Toasts from "./playground/toasts"
import Dialogs from "./playground/dialogs"
import { Icon, Text, useNostrContext, useWebLNContext } from "@fedibtc/ui"
import Container from "./components/container"
import NostrExample from "./playground/nostr"
import WebLNExample from "./playground/webln"

function App() {
  const weblnStatus = useWebLNContext()
  const nostrStatus = useNostrContext()

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

  if (weblnStatus.isLoading) {
    content = (
      <Container title="Loading WebLN...">
        <Icon icon="IconLoader2" className="animate-spin" />
      </Container>
    )
  }

  if (nostrStatus.isLoading) {
    content = (
      <Container title="Loading Nostr...">
        <Icon icon="IconLoader2" className="animate-spin" />
      </Container>
    )
  }

  if (weblnStatus.error) {
    content = (
      <Container title="WebLN Error">
        <Text>{weblnStatus.error.message}</Text>
      </Container>
    )
  }

  if (nostrStatus.error) {
    content = (
      <Container title="Nostr Error">
        <Text>{nostrStatus.error.message}</Text>
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
