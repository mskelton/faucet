import { CdpClient } from "@coinbase/cdp-sdk"
import dotenv from "dotenv"
import ProgressBar from "progress"

dotenv.config({ quiet: true })

const cdp = new CdpClient()

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
      return "limit_exceeded"
    }

    if (error.errorType === "network_connection_failed") {
      process.stderr.write("network connection failed, retrying...")
      return "network_connection_failed"
    }

    throw error
  }
}

const USDC = 10
const ETH = 50

const bar = new ProgressBar("[:bar] :current/:total", {
  total: USDC + ETH,
})

async function requestMultipleTimes(token, count) {
  for (let i = 0; i < count; i++) {
    const response = await request(process.env.ADDRESS, token)

    if (response === "limit_exceeded") {
      console.log(`${token.toUpperCase()} limit exceeded`)
      bar.tick(count - i)
      return
    }

    await sleep(1000)
    bar.tick()
  }
}

await requestMultipleTimes("usdc", USDC)
await requestMultipleTimes("eth", ETH)
