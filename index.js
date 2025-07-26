import { CdpClient } from "@coinbase/cdp-sdk"
import dotenv from "dotenv"

dotenv.config()

const cdp = new CdpClient()

async function request(address) {
  await cdp.evm.requestFaucet({
    address,
    network: "base-sepolia",
    token: "usdc",
  })
}

const address = process.argv[2]
await request(address)
