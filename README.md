# Americans Flags NFT (Archive)

**Americans Flags NFT** is a decentralized web application inspired by the _Americans Flags_ art project created by **Tim Ferguson Sauder** through Return Design at Olin College. The application allowed users to create and mint personalized U.S. flag–based NFTs on the Polygon blockchain as an expression of what “America” means to them.

> ⚠️ **Project Status: Archival**
>
> This web application is now maintained **for archival and documentation purposes only**.
> Much of the original smart contract scripting, Web3 tooling, and testnet integrations used at the time of development (2021–2023) are now **deprecated or obsolete**. Active minting and blockchain interaction should not be considered production-ready.

---

## Overview

Between December 2021 and January 2023, this project explored how a physical, interactive art installation could be adapted into a digital, decentralized experience. Through a React-based frontend and Polygon smart contracts, users were able to:

- Generate custom flag compositions
- Mint NFTs representing personal interpretations of national identity
- Interact with a free-to-mint (gas-only) NFT contract
- View on-chain data via Polygon-supported tools (e.g., Polygonscan)

This repository preserves the **frontend application**, design decisions, and architectural approach used during that period.

---

## Artistic Context

The project is directly inspired by the original _Americans Flags_ work by Tim Ferguson Sauder.

> This body of work was created in response to conversations about political identity, disagreement, and communication in the United States. It serves as an exercise in listening to others’ experiences and reflecting on what national identity means from many perspectives.

More information about the original project can be found here:
[https://www.americansflags.net/](https://www.americansflags.net/)

---

## Current Status (Important)

- ✅ Frontend builds and runs locally
- ⚠️ Smart contracts may rely on **deprecated Polygon testnets**
- ⚠️ Web3 APIs and wallet connection flows may be outdated
- ❌ No guarantees of successful minting or on-chain interaction
- ❌ Not intended for active production deployment

This repository should be treated as:

- A **historical snapshot**
- A **learning reference** for Web3 + React patterns of the era
- An **archival record** of the project’s design and intent

---

## Tech Stack

- **Frontend:** React (Create React App)
- **Routing:** React Router
- **Blockchain:** Polygon (Web3.js)
- **Wallet Integration:** MetaMask
- **Styling:** CSS + inline styles
- **Deployment (historical):** Heroku

---

## Running Locally

```bash
npm install
npm start
```

To create a production build:

```bash
npm run build
```

---

## Notes on Deployment

Previous deployments relied on Create React App–specific Heroku buildpacks, which are now end-of-life. Modern deployments should instead use:

- The Heroku Node.js buildpack **or**
- A modern frontend stack (Vite, Next.js, Remix)

---

## Credits

- **Original Art Project:** Tim Ferguson Sauder
- **Digital Adaptation & Web App:** Project contributors
- **Institutional Context:** Olin College of Engineering / Return Design

---

## License

This project is provided for **educational and archival purposes**.
Please respect the original artwork, concept, and associated intellectual property.
