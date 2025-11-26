export interface InjectionNostrProvider {
  getPublicKey(): Promise<string>
  signEvent(event: UnsignedNostrEvent): Promise<SignedNostrEvent>
  nip44: {
    encrypt(pubkey: string, plaintext: string): Promise<string>
    decrypt(pubkey: string, ciphertext: string): Promise<string>
  }
  nip04: {
    encrypt(pubkey: string, plaintext: string): Promise<string>
    decrypt(pubkey: string, ciphertext: string): Promise<string>
  }
}

export interface UnsignedNostrEvent {
  created_at: number
  kind: number
  content: string
  tags: Array<Array<string>>
}

export interface SignedNostrEvent extends UnsignedNostrEvent {
  id: string
  pubkey: string
  sig: string
}
