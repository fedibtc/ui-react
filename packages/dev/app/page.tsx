"use client";
import { Button, Text } from "@fedibtc/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
      <Text variant="h1" weight="bolder">
        Hi there!
      </Text>
    </main>
  );
}
