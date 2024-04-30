import { Button, Checkbox, Input, Text, useToast, useWebLN } from "@fedibtc/ui"
import Container from "../components/container"
import { useState } from "react"

export default function WebLNExample() {
  const [invoice, setInvoice] = useState("")
  const [amount, setAmount] = useState(1)
  const [fixed, setFixed] = useState(true)

  const webln = useWebLN()

  const toast = useToast()

  const payInvoice = async () => {
    try {
      await webln.sendPayment(invoice)
      toast.show({
        content: "Invoice Paid successfully"
      })
    } catch (e) {
      console.error(e)
      toast.error(e)
    } finally {
      setInvoice("")
    }
  }

  const createInvoice = async () => {
    try {
      if (amount <= 0) throw new Error("Amount must be greater than 0")

      const invoice = await webln.makeInvoice(
        fixed
          ? {
              amount
            }
          : {
              defaultAmount: amount
            }
      )
      await window.navigator.clipboard.writeText(invoice.paymentRequest)
      toast.show({
        content: "Invoice copied to clipboard: " + invoice.paymentRequest
      })
    } catch (e) {
      console.error(e)
      toast.error(e)
    }
  }

  return (
    <Container title="WebLN">
      <Text weight="medium">Pay Invoice</Text>
      <Input
        value={invoice}
        onChange={e => setInvoice(e.target.value)}
        placeholder="lnbc..."
        label="Lightning Invoice"
      />
      <Button onClick={payInvoice}>Pay Invoice</Button>
      <hr />
      <Text weight="medium">Create Invoice</Text>
      <Input
        value={String(amount)}
        onChange={e => setAmount(parseFloat(e.target.value))}
        type="number"
        label="Amount (sats)"
      />
      <Checkbox label="Fixed Amount" checked={fixed} onChange={setFixed} />
      <Button onClick={createInvoice}>Create Invoice</Button>
    </Container>
  )
}
