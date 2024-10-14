# Event-DApp-Contracts

This repository contains the smart contracts for an event-based decentralized application (DApp). These contracts handle ticketing, event management, and token integration using Solidity. The code is based on OpenZeppelin standards and integrates with the Infura network.

## Folder Structure

```bash
event-dapp-contracts/
│
├── .openzeppelin/           # OpenZeppelin configurations
├── build/contracts/         # Compiled contract artifacts
├── contracts/               # Solidity smart contracts
│   ├── DaoEvents.sol        # DAO-based event management contract
│   ├── EventTicket.sol      # Smart contract for event ticketing
│   ├── StableToken.sol      # ERC20 stable token contract
│   └── .gitkeep             # Placeholder for empty folder
├── .gitignore               # Ignored files
├── networks.js              # Network configurations (e.g., Infura)
├── package.json             # Project dependencies
└── README.md                # Project documentation
```
## Contracts
- DaoEvents.sol: Manages event lifecycle and interactions within a decentralized organization (DAO) context.
- EventTicket.sol: Facilitates ticket issuance, sales, and transfers.
- StableToken.sol: Implements a stable ERC20 token used for event transactions.
 