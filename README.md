# Faucet

A Node.js script that automatically requests test tokens from the Coinbase CDP
(Cloud Development Platform) faucet for Base Sepolia testnet.

## Overview

This script helps developers get test tokens (USDC and ETH) for development and
testing on the Base Sepolia network. It uses the Coinbase CDP SDK to make faucet
requests and includes rate limiting and progress tracking.

## Features

- **Automated token requests**: Requests both USDC and ETH test tokens
- **Rate limiting**: Includes 1-second delays between requests to respect API
  limits
- **Progress tracking**: Visual progress bar showing request status
- **Error handling**: Gracefully handles faucet limit exceeded errors
- **Environment-based configuration**: Uses `.env` file for wallet address

## Prerequisites

- Node.js (v22 or higher)
- A Base Sepolia wallet address
- Coinbase CDP account (for API access)

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the project root:
   ```bash
   touch .env
   ```
2. Add your wallet address to the `.env` file:
   ```
   ADDRESS=0x...
   ```

## Usage

Run the faucet script:

```bash
npm run request
```

Or directly with Node.js:

```bash
node index.js
```

## How it works

The script will:

1. Request **10 USDC** test tokens
2. Request **30 ETH** test tokens
3. Display a progress bar showing the current request status
4. Automatically stop if the faucet limit is exceeded for either token
5. Include a 1-second delay between requests to respect rate limits

## Network

This script is configured for the **Base Sepolia** testnet. The Base Sepolia
network is a testnet for the Base L2 network built on Ethereum.

## Error Handling

The script handles the following scenarios:

- **Faucet limit exceeded**: Gracefully stops requesting that token type
- **Network errors**: Throws errors for debugging
- **Invalid addresses**: Validates wallet address format

## Rate Limiting

The script includes a 1-second delay between requests to respect the faucet's
rate limits and avoid overwhelming the service.
