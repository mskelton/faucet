import { CdpClient } from "@coinbase/cdp-sdk"
import dotenv from "dotenv"

dotenv.config({ quiet: true })

const cdp = new CdpClient()

async function request(address, token) {
  await cdp.evm.requestFaucet({
    address,
    network: "base-sepolia",
    token,
  })
}

const address = process.argv[2]

for (let i = 0; i < 10; i++) {
  await request(address, "usdc")
}

for (let i = 0; i < 50; i++) {
  await request(address, "eth")
}
