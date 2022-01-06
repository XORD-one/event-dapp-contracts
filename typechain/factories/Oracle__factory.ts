/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { Oracle } from "../Oracle";

export class Oracle__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<Oracle> {
    return super.deploy(overrides || {}) as Promise<Oracle>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Oracle {
    return super.attach(address) as Oracle;
  }
  connect(signer: Signer): Oracle__factory {
    return super.connect(signer) as Oracle__factory;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Oracle {
    return new Contract(address, _abi, signerOrProvider) as Oracle;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "AssetValue",
    type: "event",
  },
  {
    inputs: [],
    name: "PHNX",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNISWAP_V2_FACTORY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDT",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "latestCommulative",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oldCommulative",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "timeElapsed",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "_calculate",
    outputs: [
      {
        internalType: "uint256",
        name: "assetValue",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cummulativeAveragePrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cummulativeAveragePriceReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cummulativeEthPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "cummulativeEthPriceReserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "fetch",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fetchPhnxPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lastTokenTimestamp",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "setValues",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenToTimestampLast",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600080546001600160a01b031916735c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f17905562000057730ceba92298b655c827d224d33461b4a1f9c418a66200005d565b62000ad3565b600080546040805163e6a4390560e01b815273c778417e063141139fce010982780140aa0cd5ab60048201526001600160a01b0385811660248301529151919092169163e6a43905916044808301926020929190829003018186803b158015620000c657600080fd5b505afa158015620000db573d6000803e3d6000fd5b505050506040513d6020811015620000f257600080fd5b505160408051808201909152600c81526b706f6f6c206164647265737360a01b602082810191909152919250620001329162000cbe62000477821b17901c565b62000148816200052a60201b62000d671760201c565b6001600160a01b0381161562000473576001600160a01b03821673c778417e063141139fce010982780140aa0cd5ab1015620002e55762000194816200057d60201b62000db31760201c565b6001600160a01b038581166000908152600260209081526040808320600183528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635909c0d560e01b8152915190841692635909c0d59260048082019391829003018186803b1580156200021457600080fd5b505afa15801562000229573d6000803e3d6000fd5b505050506040513d60208110156200024057600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635a3d549360e01b8152915192851693635a3d5493938383019391929091829003018186803b1580156200029857600080fd5b505afa158015620002ad573d6000803e3d6000fd5b505050506040513d6020811015620002c457600080fd5b50516001600160a01b03831660009081526005602052604090205562000447565b620002fb816200057d60201b62000db31760201c565b6001600160a01b038581166000908152600160209081526040808320600283528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635a3d549360e01b8152915190841692635a3d54939260048082019391829003018186803b1580156200037b57600080fd5b505afa15801562000390573d6000803e3d6000fd5b505050506040513d6020811015620003a757600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635909c0d560e01b8152915192851693635909c0d5938383019391929091829003018186803b158015620003ff57600080fd5b505afa15801562000414573d6000803e3d6000fd5b505050506040513d60208110156200042b57600080fd5b50516001600160a01b0383166000908152600560205260409020555b6001600160a01b0382166000908152600660205260409020805463ffffffff19164263ffffffff161790555b5050565b62000527816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015620004be578181015183820152602001620004a4565b50505050905090810190601f168015620004ec5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b0390811663104c13eb60e21b17909152909350620007a716915050565b50565b604080516001600160a01b0383166024808301919091528251808303909101815260449091019091526020810180516001600160e01b0390811663161765e160e11b17909152620005279190620007a716565b60008080806200058c620007c8565b90506000856001600160a01b0316635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b158015620005ca57600080fd5b505afa158015620005df573d6000803e3d6000fd5b505050506040513d6020811015620005f657600080fd5b505160408051635a3d549360e01b815290519192506000916001600160a01b03891691635a3d5493916004808301926020929190829003018186803b1580156200063f57600080fd5b505afa15801562000654573d6000803e3d6000fd5b505050506040513d60208110156200066b57600080fd5b505160408051630240bc6b60e21b81529051919250600091829182916001600160a01b038c1691630902f1ac916004808301926060929190829003018186803b158015620006b857600080fd5b505afa158015620006cd573d6000803e3d6000fd5b505050506040513d6060811015620006e457600080fd5b5080516020820151604090920151909450909250905063ffffffff808216908716146200079657600081870390508063ffffffff1662000742846001600160701b0316866001600160701b0316620007d260201b62000fae1760201c565b600001516001600160e01b031602860195508063ffffffff1662000784856001600160701b0316856001600160701b0316620007d260201b62000fae1760201c565b516001600160e01b0316029490940193505b939992985092965090945050505050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b63ffffffff421690565b620007dc62000ac1565b600082116200081d5760405162461bcd60e51b8152600401808060200182810382526026815260200180620021686026913960400191505060405180910390fd5b8262000839575060408051602081019091526000815262000956565b6001600160901b038311620008d957600082607085901b816200085857fe5b0490506001600160e01b03811115620008b8576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b031681525091505062000956565b6000620008f784600160701b856200095c60201b620011201760201c565b90506001600160e01b03811115620008b8576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b92915050565b600080806200096c868662000a20565b91509150600084806200097b57fe5b86880990508281111562000990576001820391505b918290039181620009b157848381620009a557fe5b04935050505062000a19565b84821062000a06576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a2046554c4c4449565f4f564552464c4f57000000000000604482015290519081900360640190fd5b62000a1383838762000a4e565b93505050505b9392505050565b600080806000198486099050838502925082810391508281101562000a46576001820391505b509250929050565b6000818103821680838162000a5f57fe5b04925080858162000a6c57fe5b04945080816000038162000a7c57fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b60408051602081019091526000815290565b6116858062000ae36000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806399d8fae31161008c578063b7ba89a411610066578063b7ba89a41461023c578063c54e44eb1461027a578063cf325a4014610282578063f109a0be146102a8576100ea565b806399d8fae314610208578063ad5c46481461022c578063b78af09814610234576100ea565b806345ff26db116100c857806345ff26db14610157578063808111e21461017d57806392b9889f146101a357806394dac07c146101c9576100ea565b8063101e85f3146100ef57806316a43b7514610117578063416b01d61461014f575b600080fd5b6101156004803603602081101561010557600080fd5b50356001600160a01b03166102ce565b005b61013d6004803603602081101561012d57600080fd5b50356001600160a01b03166106a0565b60408051918252519081900360200190f35b61013d6106b2565b61013d6004803603602081101561016d57600080fd5b50356001600160a01b0316610893565b61013d6004803603602081101561019357600080fd5b50356001600160a01b03166108a5565b61013d600480360360208110156101b957600080fd5b50356001600160a01b03166108b7565b6101ef600480360360208110156101df57600080fd5b50356001600160a01b03166108c9565b6040805163ffffffff9092168252519081900360200190f35b6102106108e1565b604080516001600160a01b039092168252519081900360200190f35b6102106108f9565b610210610911565b61013d6004803603608081101561025257600080fd5b50803590602081013590604081013563ffffffff1690606001356001600160a01b0316610929565b610210610a04565b6101ef6004803603602081101561029857600080fd5b50356001600160a01b0316610a1c565b61013d600480360360208110156102be57600080fd5b50356001600160a01b0316610a34565b600080546040805163e6a4390560e01b815273c778417e063141139fce010982780140aa0cd5ab60048201526001600160a01b0385811660248301529151919092169163e6a43905916044808301926020929190829003018186803b15801561033657600080fd5b505afa15801561034a573d6000803e3d6000fd5b505050506040513d602081101561036057600080fd5b505160408051808201909152600c81526b706f6f6c206164647265737360a01b602082015290915061039190610cbe565b61039a81610d67565b6001600160a01b0381161561069c576001600160a01b03821673c778417e063141139fce010982780140aa0cd5ab1015610521576103d781610db3565b6001600160a01b038581166000908152600260209081526040808320600183528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635909c0d560e01b8152915190841692635909c0d59260048082019391829003018186803b15801561045657600080fd5b505afa15801561046a573d6000803e3d6000fd5b505050506040513d602081101561048057600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635a3d549360e01b8152915192851693635a3d5493938383019391929091829003018186803b1580156104d757600080fd5b505afa1580156104eb573d6000803e3d6000fd5b505050506040513d602081101561050157600080fd5b50516001600160a01b038316600090815260056020526040902055610670565b61052a81610db3565b6001600160a01b038581166000908152600160209081526040808320600283528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635a3d549360e01b8152915190841692635a3d54939260048082019391829003018186803b1580156105a957600080fd5b505afa1580156105bd573d6000803e3d6000fd5b505050506040513d60208110156105d357600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635909c0d560e01b8152915192851693635909c0d5938383019391929091829003018186803b15801561062a57600080fd5b505afa15801561063e573d6000803e3d6000fd5b505050506040513d602081101561065457600080fd5b50516001600160a01b0383166000908152600560205260409020555b6001600160a01b0382166000908152600660205260409020805463ffffffff19164263ffffffff161790555b5050565b60026020526000908152604090205481565b73521855aa99a80cb467a12b1881f05cf9440c7023600090815260016020527f5aa60b6636fa6a4393a3e385e853e5fc793eb7aaf1bdee1d7c8d1ef8c7507a4b541580610755575073521855aa99a80cb467a12b1881f05cf9440c702360005260066020527fa93173b729a90f357b7cbfe296767d368659188ade3752743517931969020a145460b4906107529063ffffffff428116918116906111db16565b10155b156107775761077773521855aa99a80cb467a12b1881f05cf9440c70236102ce565b73521855aa99a80cb467a12b1881f05cf9440c702360009081527ff12de01938fb005b2fe3cd4c360418ec4f9a2c4e5f8250b3e84afc22c1905a6f5460066020527fa93173b729a90f357b7cbfe296767d368659188ade3752743517931969020a14546107f19163ffffffff91821691908116906111db16565b73521855aa99a80cb467a12b1881f05cf9440c702360008190527f32af7211e6e945a5bbbffc15ea23b9d529e984b0b01eb63c6bc6d04b92d632e25460046020527f087cb0c6dc93614f3a46de51eb5c681f8e8145b0437a7c6e979bc0a383507935549293506108649290918490610929565b604080518281524260208201528151929450600080516020611630833981519152929081900390910190a15090565b60056020526000908152604090205481565b60016020526000908152604090205481565b60046020526000908152604090205481565b60036020526000908152604090205463ffffffff1681565b735c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f81565b73c778417e063141139fce010982780140aa0cd5ab81565b73521855aa99a80cb467a12b1881f05cf9440c702381565b60006109336115c3565b60405180602001604052806109618663ffffffff1661095b898b6111db90919063ffffffff16565b90611238565b6001600160e01b031681525090506000836001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156109aa57600080fd5b505afa1580156109be573d6000803e3d6000fd5b505050506040513d60208110156109d457600080fd5b505190506109f06109eb8360ff8416600a0a61129f565b611333565b6001600160901b0316979650505050505050565b730ceba92298b655c827d224d33461b4a1f9c418a681565b60066020526000908152604090205463ffffffff1681565b6001600160a01b0381166000908152600160205260408120541580610a8957506001600160a01b03821660009081526006602052604090205460b490610a869063ffffffff428116918116906111db16565b10155b15610a9757610a97826102ce565b6000610ab6730ceba92298b655c827d224d33461b4a1f9c418a661133a565b9050610ae36040518060400160405280600a815260200169195d1a14195c9554d11560b21b815250610cbe565b610aec81611461565b604080518281524260208201528151600080516020611630833981519152929181900390910190a16001600160a01b03831673c778417e063141139fce010982780140aa0cd5ab1415610bc157809150610b6260405180604001604052806005815260200164707269636560d81b815250610cbe565b610b6b82611461565b604080518281524260208201528151600080516020611630833981519152929181900390910190a1604080518381524260208201528151600080516020611630833981519152929181900390910190a150610cb9565b6000610bcc8461133a565b604080518281524260208201528151929350600080516020611630833981519152929081900390910190a1610c236040518060400160405280600b81526020016a32ba342832b92a37b5b2b760a91b815250610cbe565b610c2c81611461565b801580610c37575081155b15610c4757600092505050610cb9565b610c5d8161095b84670de0b6b3a76400006114a2565b9250610c8560405180604001604052806005815260200164707269636560d81b815250610cbe565b610c8e83611461565b604080518481524260208201528151600080516020611630833981519152929181900390910190a150505b919050565b610d64816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015610d02578181015183820152602001610cea565b50505050905090810190601f168015610d2f5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b17905292506114fb915050565b50565b604080516001600160a01b0383166024808301919091528251808303909101815260449091019091526020810180516001600160e01b031663161765e160e11b179052610d64906114fb565b600080600080610dc161151c565b90506000856001600160a01b0316635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b158015610dfe57600080fd5b505afa158015610e12573d6000803e3d6000fd5b505050506040513d6020811015610e2857600080fd5b505160408051635a3d549360e01b815290519192506000916001600160a01b03891691635a3d5493916004808301926020929190829003018186803b158015610e7057600080fd5b505afa158015610e84573d6000803e3d6000fd5b505050506040513d6020811015610e9a57600080fd5b505160408051630240bc6b60e21b81529051919250600091829182916001600160a01b038c1691630902f1ac916004808301926060929190829003018186803b158015610ee657600080fd5b505afa158015610efa573d6000803e3d6000fd5b505050506040513d6060811015610f1057600080fd5b5080516020820151604090920151909450909250905063ffffffff80821690871614610f9d5780860363ffffffff8116610f566001600160701b03808616908716610fae565b600001516001600160e01b031602860195508063ffffffff16610f8b856001600160701b0316856001600160701b0316610fae565b516001600160e01b0316029490940193505b939992985092965090945050505050565b610fb66115c3565b60008211610ff55760405162461bcd60e51b81526004018080602001828103825260268152602001806115e96026913960400191505060405180910390fd5b8261100f575060408051602081019091526000815261111a565b6001600160901b0383116110ab57600082607085901b8161102c57fe5b0490506001600160e01b0381111561108b576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b031681525091505061111a565b60006110bc84600160701b85611120565b90506001600160e01b0381111561108b576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b92915050565b600080600061112f8686611526565b915091506000848061113d57fe5b868809905082811115611151576001820391505b91829003918161116f5784838161116457fe5b0493505050506111d4565b8482106111c3576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a2046554c4c4449565f4f564552464c4f57000000000000604482015290519081900360640190fd5b6111ce838387611553565b93505050505b9392505050565b600082821115611232576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600080821161128e576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b81838161129757fe5b049392505050565b6112a76115d5565b60008215806112cd57505082516001600160e01b0316828102908382816112ca57fe5b04145b61131e576040805162461bcd60e51b815260206004820152601960248201527f4669786564506f696e743a3a6d756c3a206f766572666c6f7700000000000000604482015290519081900360640190fd5b60408051602081019091529081529392505050565b5160701c90565b600080546040805163e6a4390560e01b815273c778417e063141139fce010982780140aa0cd5ab60048201526001600160a01b03858116602483015291518493929092169163e6a4390591604480820192602092909190829003018186803b1580156113a557600080fd5b505afa1580156113b9573d6000803e3d6000fd5b505050506040513d60208110156113cf57600080fd5b505190506001600160a01b0381166113eb576000915050610cb9565b6001600160a01b03831660009081526003602090815260408083205460069092528220546114269163ffffffff91821691908116906111db16565b6001600160a01b038516600090815260016020908152604080832054600590925290912054919250611459918387610929565b949350505050565b6040805160248082018490528251808303909101815260449091019091526020810180516001600160e01b031663f5b1bba960e01b179052610d64906114fb565b6000826114b15750600061111a565b828202828482816114be57fe5b04146111d45760405162461bcd60e51b815260040180806020018281038252602181526020018061160f6021913960400191505060405180910390fd5b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b63ffffffff421690565b600080806000198486099050838502925082810391508281101561154b576001820391505b509250929050565b6000818103821680838161156357fe5b04925080858161156f57fe5b04945080816000038161157e57fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b60408051602081019091526000815290565b604051806020016040528060008152509056fe4669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7721765dcfbfbb6a01c53e4631c19f4e3ba58f8dc02e4e6f6ff71115970a5c89eda2646970667358221220914f4b9557521180db73a28f74fa37fd5eed51c4aada9c46c5f682ddf05686c364736f6c634300070500334669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f";
