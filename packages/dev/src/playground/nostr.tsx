import { Button, Dialog, Text, useNostr } from "@fedibtc/ui"
import Container from "../components/container"
import { Event, UnsignedEvent, getEventHash } from "nostr-tools"
import { useState } from "react"

export default function NostrExample() {
  const [signedNostrEvent, setSignedNostrEvent] = useState<Event | null>(null)
  const nostr = useNostr()

  const signTestEvent = async () => {
    const unsignedEvent: UnsignedEvent = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: "This is a test event",
      pubkey: nostr.pubkey
    }

    const event: Omit<Event, "sig"> = {
      ...unsignedEvent,
      id: getEventHash(unsignedEvent)
    }

    const signedEvent: Event = await nostr.signEvent(event)

    setSignedNostrEvent(signedEvent)
  }

  return (
    <Container title="Nostr">
      <Text variant="small">
        <strong>Pubkey: </strong>
        {nostr.pubkey}
      </Text>
      <Button onClick={signTestEvent}>Sign Test Event</Button>
      <Dialog
        open={!!signedNostrEvent}
        onOpenChange={open => !open && setSignedNostrEvent(null)}
      >
        {Object.entries(signedNostrEvent || {}).map(([key, value]) => (
          <Text key={key} variant="small">
            <strong>{key}: </strong>
            {value}
          </Text>
        ))}
      </Dialog>
    </Container>
  )
}
