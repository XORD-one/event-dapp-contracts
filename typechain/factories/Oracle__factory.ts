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
  "0x60806040523480156200001157600080fd5b50600080546001600160a01b031916735c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f179055620000577338a2fdc11f526ddd5a607c1f251c065f40fbf2f76200005d565b6200095a565b600080546040805163e6a4390560e01b815273c02aaa39b223fe8d0a0e5c4f27ead9083c756cc260048201526001600160a01b0385811660248301529151919092169163e6a43905916044808301926020929190829003018186803b158015620000c657600080fd5b505afa158015620000db573d6000803e3d6000fd5b505050506040513d6020811015620000f257600080fd5b505190506001600160a01b0381161562000421576001600160a01b03821673c02aaa39b223fe8d0a0e5c4f27ead9083c756cc21015620002935762000142816200042560201b62000b0a1760201c565b6001600160a01b038581166000908152600260209081526040808320600183528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635909c0d560e01b8152915190841692635909c0d59260048082019391829003018186803b158015620001c257600080fd5b505afa158015620001d7573d6000803e3d6000fd5b505050506040513d6020811015620001ee57600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635a3d549360e01b8152915192851693635a3d5493938383019391929091829003018186803b1580156200024657600080fd5b505afa1580156200025b573d6000803e3d6000fd5b505050506040513d60208110156200027257600080fd5b50516001600160a01b038316600090815260056020526040902055620003f5565b620002a9816200042560201b62000b0a1760201c565b6001600160a01b038581166000908152600160209081526040808320600283528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635a3d549360e01b8152915190841692635a3d54939260048082019391829003018186803b1580156200032957600080fd5b505afa1580156200033e573d6000803e3d6000fd5b505050506040513d60208110156200035557600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635909c0d560e01b8152915192851693635909c0d5938383019391929091829003018186803b158015620003ad57600080fd5b505afa158015620003c2573d6000803e3d6000fd5b505050506040513d6020811015620003d957600080fd5b50516001600160a01b0383166000908152600560205260409020555b6001600160a01b0382166000908152600660205260409020805463ffffffff19164263ffffffff161790555b5050565b6000808080620004346200064f565b90506000856001600160a01b0316635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b1580156200047257600080fd5b505afa15801562000487573d6000803e3d6000fd5b505050506040513d60208110156200049e57600080fd5b505160408051635a3d549360e01b815290519192506000916001600160a01b03891691635a3d5493916004808301926020929190829003018186803b158015620004e757600080fd5b505afa158015620004fc573d6000803e3d6000fd5b505050506040513d60208110156200051357600080fd5b505160408051630240bc6b60e21b81529051919250600091829182916001600160a01b038c1691630902f1ac916004808301926060929190829003018186803b1580156200056057600080fd5b505afa15801562000575573d6000803e3d6000fd5b505050506040513d60608110156200058c57600080fd5b5080516020820151604090920151909450909250905063ffffffff808216908716146200063e57600081870390508063ffffffff16620005ea846001600160701b0316866001600160701b03166200065960201b62000d051760201c565b600001516001600160e01b031602860195508063ffffffff166200062c856001600160701b0316856001600160701b03166200065960201b62000d051760201c565b516001600160e01b0316029490940193505b939992985092965090945050505050565b63ffffffff421690565b6200066362000948565b60008211620006a45760405162461bcd60e51b815260040180806020018281038252602681526020018062001ce46026913960400191505060405180910390fd5b82620006c05750604080516020810190915260008152620007dd565b6001600160901b0383116200076057600082607085901b81620006df57fe5b0490506001600160e01b038111156200073f576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b0316815250915050620007dd565b60006200077e84600160701b85620007e360201b62000e771760201c565b90506001600160e01b038111156200073f576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b92915050565b60008080620007f38686620008a7565b91509150600084806200080257fe5b86880990508281111562000817576001820391505b91829003918162000838578483816200082c57fe5b049350505050620008a0565b8482106200088d576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a2046554c4c4449565f4f564552464c4f57000000000000604482015290519081900360640190fd5b6200089a838387620008d5565b93505050505b9392505050565b6000808060001984860990508385029250828103915082811015620008cd576001820391505b509250929050565b60008181038216808381620008e657fe5b049250808581620008f357fe5b0494508081600003816200090357fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b60408051602081019091526000815290565b61137a806200096a6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806394dac07c1161008c578063b78af09811610066578063b78af09814610219578063b7ba89a414610221578063cf325a401461025f578063f109a0be14610285576100cf565b806394dac07c146101ae57806399d8fae3146101ed578063ad5c464814610211576100cf565b8063101e85f3146100d457806316a43b75146100fc578063416b01d61461013457806345ff26db1461013c578063808111e21461016257806392b9889f14610188575b600080fd5b6100fa600480360360208110156100ea57600080fd5b50356001600160a01b03166102ab565b005b6101226004803603602081101561011257600080fd5b50356001600160a01b0316610647565b60408051918252519081900360200190f35b610122610659565b6101226004803603602081101561015257600080fd5b50356001600160a01b031661083a565b6101226004803603602081101561017857600080fd5b50356001600160a01b031661084c565b6101226004803603602081101561019e57600080fd5b50356001600160a01b031661085e565b6101d4600480360360208110156101c457600080fd5b50356001600160a01b0316610870565b6040805163ffffffff9092168252519081900360200190f35b6101f5610888565b604080516001600160a01b039092168252519081900360200190f35b6101f56108a0565b6101f56108b8565b6101226004803603608081101561023757600080fd5b50803590602081013590604081013563ffffffff1690606001356001600160a01b03166108d0565b6101d46004803603602081101561027557600080fd5b50356001600160a01b03166109ab565b6101226004803603602081101561029b57600080fd5b50356001600160a01b03166109c3565b600080546040805163e6a4390560e01b815273c02aaa39b223fe8d0a0e5c4f27ead9083c756cc260048201526001600160a01b0385811660248301529151919092169163e6a43905916044808301926020929190829003018186803b15801561031357600080fd5b505afa158015610327573d6000803e3d6000fd5b505050506040513d602081101561033d57600080fd5b505190506001600160a01b03811615610643576001600160a01b03821673c02aaa39b223fe8d0a0e5c4f27ead9083c756cc210156104c85761037e81610b0a565b6001600160a01b038581166000908152600260209081526040808320600183528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635909c0d560e01b8152915190841692635909c0d59260048082019391829003018186803b1580156103fd57600080fd5b505afa158015610411573d6000803e3d6000fd5b505050506040513d602081101561042757600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635a3d549360e01b8152915192851693635a3d5493938383019391929091829003018186803b15801561047e57600080fd5b505afa158015610492573d6000803e3d6000fd5b505050506040513d60208110156104a857600080fd5b50516001600160a01b038316600090815260056020526040902055610617565b6104d181610b0a565b6001600160a01b038581166000908152600160209081526040808320600283528184206003845293829020805463ffffffff191663ffffffff979097169690961790955594909155939091558151635a3d549360e01b8152915190841692635a3d54939260048082019391829003018186803b15801561055057600080fd5b505afa158015610564573d6000803e3d6000fd5b505050506040513d602081101561057a57600080fd5b50516001600160a01b03808416600090815260046020818152604092839020949094558151635909c0d560e01b8152915192851693635909c0d5938383019391929091829003018186803b1580156105d157600080fd5b505afa1580156105e5573d6000803e3d6000fd5b505050506040513d60208110156105fb57600080fd5b50516001600160a01b0383166000908152600560205260409020555b6001600160a01b0382166000908152600660205260409020805463ffffffff19164263ffffffff161790555b5050565b60026020526000908152604090205481565b7338a2fdc11f526ddd5a607c1f251c065f40fbf2f7600090815260016020527f67f6248a6c812dd76fd3cdf066e8b3a5204297f07090a07a24560d7f644701c05415806106fc57507338a2fdc11f526ddd5a607c1f251c065f40fbf2f760005260066020527f7757f2f1d16a966c2c44755dec3475086ec0fb642b487dcba99341d973566fae5460b4906106f99063ffffffff42811691811690610f3216565b10155b1561071e5761071e7338a2fdc11f526ddd5a607c1f251c065f40fbf2f76102ab565b7338a2fdc11f526ddd5a607c1f251c065f40fbf2f760009081527fdca375875fa68a0cf28cbe0cdea7b63a5aac62d2d9aee4a97ff920c34f1aac9a5460066020527f7757f2f1d16a966c2c44755dec3475086ec0fb642b487dcba99341d973566fae546107989163ffffffff9182169190811690610f3216565b7338a2fdc11f526ddd5a607c1f251c065f40fbf2f760008190527f89f8b66de14626629ad1fb5bf45d6c381e2148985efe8c5857109ab73adee62b5460046020527fdba1c6bacb8f57c3f231a0b749931069ae1efa5db01ab2802e68413141952bf55492935061080b92909184906108d0565b604080518281524260208201528151929450600080516020611325833981519152929081900390910190a15090565b60056020526000908152604090205481565b60016020526000908152604090205481565b60046020526000908152604090205481565b60036020526000908152604090205463ffffffff1681565b735c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f81565b73c02aaa39b223fe8d0a0e5c4f27ead9083c756cc281565b7338a2fdc11f526ddd5a607c1f251c065f40fbf2f781565b60006108da6112b8565b60405180602001604052806109088663ffffffff16610902898b610f3290919063ffffffff16565b90610f8f565b6001600160e01b031681525090506000836001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561095157600080fd5b505afa158015610965573d6000803e3d6000fd5b505050506040513d602081101561097b57600080fd5b505190506109976109928360ff8416600a0a610ff6565b61108a565b6001600160901b0316979650505050505050565b60066020526000908152604090205463ffffffff1681565b6001600160a01b0381166000908152600160205260408120541580610a1857506001600160a01b03821660009081526006602052604090205460b490610a159063ffffffff42811691811690610f3216565b10155b15610a2657610a26826102ab565b6000610a457338a2fdc11f526ddd5a607c1f251c065f40fbf2f7611091565b604080518281524260208201528151929350600080516020611325833981519152929081900390910190a16000610a7b84611091565b604080518281524260208201528151929350600080516020611325833981519152929081900390910190a1801580610ab1575081155b15610ac157600092505050610b05565b610ad78261090283670de0b6b3a76400006111b8565b604080518281524260208201528151929550600080516020611325833981519152929081900390910190a150505b919050565b600080600080610b18611211565b90506000856001600160a01b0316635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b158015610b5557600080fd5b505afa158015610b69573d6000803e3d6000fd5b505050506040513d6020811015610b7f57600080fd5b505160408051635a3d549360e01b815290519192506000916001600160a01b03891691635a3d5493916004808301926020929190829003018186803b158015610bc757600080fd5b505afa158015610bdb573d6000803e3d6000fd5b505050506040513d6020811015610bf157600080fd5b505160408051630240bc6b60e21b81529051919250600091829182916001600160a01b038c1691630902f1ac916004808301926060929190829003018186803b158015610c3d57600080fd5b505afa158015610c51573d6000803e3d6000fd5b505050506040513d6060811015610c6757600080fd5b5080516020820151604090920151909450909250905063ffffffff80821690871614610cf45780860363ffffffff8116610cad6001600160701b03808616908716610d05565b600001516001600160e01b031602860195508063ffffffff16610ce2856001600160701b0316856001600160701b0316610d05565b516001600160e01b0316029490940193505b939992985092965090945050505050565b610d0d6112b8565b60008211610d4c5760405162461bcd60e51b81526004018080602001828103825260268152602001806112de6026913960400191505060405180910390fd5b82610d665750604080516020810190915260008152610e71565b6001600160901b038311610e0257600082607085901b81610d8357fe5b0490506001600160e01b03811115610de2576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b6040518060200160405280826001600160e01b0316815250915050610e71565b6000610e1384600160701b85610e77565b90506001600160e01b03811115610de2576040805162461bcd60e51b815260206004820152601e60248201527f4669786564506f696e743a3a6672616374696f6e3a206f766572666c6f770000604482015290519081900360640190fd5b92915050565b6000806000610e86868661121b565b9150915060008480610e9457fe5b868809905082811115610ea8576001820391505b918290039181610ec657848381610ebb57fe5b049350505050610f2b565b848210610f1a576040805162461bcd60e51b815260206004820152601a60248201527f46756c6c4d6174683a2046554c4c4449565f4f564552464c4f57000000000000604482015290519081900360640190fd5b610f25838387611248565b93505050505b9392505050565b600082821115610f89576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6000808211610fe5576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381610fee57fe5b049392505050565b610ffe6112ca565b600082158061102457505082516001600160e01b03168281029083828161102157fe5b04145b611075576040805162461bcd60e51b815260206004820152601960248201527f4669786564506f696e743a3a6d756c3a206f766572666c6f7700000000000000604482015290519081900360640190fd5b60408051602081019091529081529392505050565b5160701c90565b600080546040805163e6a4390560e01b815273c02aaa39b223fe8d0a0e5c4f27ead9083c756cc260048201526001600160a01b03858116602483015291518493929092169163e6a4390591604480820192602092909190829003018186803b1580156110fc57600080fd5b505afa158015611110573d6000803e3d6000fd5b505050506040513d602081101561112657600080fd5b505190506001600160a01b038116611142576000915050610b05565b6001600160a01b038316600090815260036020908152604080832054600690925282205461117d9163ffffffff9182169190811690610f3216565b6001600160a01b0385166000908152600160209081526040808320546005909252909120549192506111b09183876108d0565b949350505050565b6000826111c757506000610e71565b828202828482816111d457fe5b0414610f2b5760405162461bcd60e51b81526004018080602001828103825260218152602001806113046021913960400191505060405180910390fd5b63ffffffff421690565b6000808060001984860990508385029250828103915082811015611240576001820391505b509250929050565b6000818103821680838161125857fe5b04925080858161126457fe5b04945080816000038161127357fe5b60028581038087028203028087028203028087028203028087028203028087028203028087028203029586029003909402930460010193909302939093010292915050565b60408051602081019091526000815290565b604051806020016040528060008152509056fe4669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7721765dcfbfbb6a01c53e4631c19f4e3ba58f8dc02e4e6f6ff71115970a5c89eda2646970667358221220c89d6cf8ad38de50c1d3fe606d4ee05a62194a9ace0021eb9721c4eb80df273364736f6c634300070500334669786564506f696e743a3a6672616374696f6e3a206469766973696f6e206279207a65726f";
