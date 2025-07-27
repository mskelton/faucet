import { CdpClient } from "@coinbase/cdp-sdk"
import dotenv from "dotenv"
import ProgressBar from "progress"

dotenv.config({ quiet: true })

const cdp = new CdpClient()

async function request(address, token) {
  try {
    await cdp.evm.requestFaucet({
      address,
      network: "base-sepolia",
      token,
    })

    return true
  } catch (error) {
    if (error.errorType === "faucet_limit_exceeded") {
      return false
    }

    throw error
  }
}

const USDC = 10
const ETH = 30

const bar = new ProgressBar("[:bar] :current/:total", {
  total: USDC + ETH,
})

async function requestMultipleTimes(token, count) {
  for (let i = 0; i < count; i++) {
    const success = await request(process.env.ADDRESS, token)

    if (!success) {
      console.log(`${token.toUpperCase()} limit exceeded`)
      bar.tick(count - i)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
    bar.tick()
  }
}

await requestMultipleTimes("usdc", USDC)
await requestMultipleTimes("eth", ETH)
