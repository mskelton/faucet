import { CdpClient } from "@coinbase/cdp-sdk"
import dotenv from "dotenv"
import ProgressBar from "progress"

dotenv.config({ quiet: true })

const cdp = new CdpClient()

async function request(address, token) {
  await cdp.evm.requestFaucet({
    address,
    network: "base-sepolia",
    token,
  })
}

const tasks = [...Array(10).fill("usdc"), ...Array(30).fill("eth")]

const bar = new ProgressBar("[:bar] :current/:total", { total: tasks.length })

for (const token of tasks) {
  await request(process.env.ADDRESS, token)
  bar.tick()
}
