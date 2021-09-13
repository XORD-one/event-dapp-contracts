/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { FixedPoint } from "../FixedPoint";

export class FixedPoint__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<FixedPoint> {
    return super.deploy(overrides || {}) as Promise<FixedPoint>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FixedPoint {
    return super.attach(address) as FixedPoint;
  }
  connect(signer: Signer): FixedPoint__factory {
    return super.connect(signer) as FixedPoint__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FixedPoint {
    return new Contract(address, _abi, signerOrProvider) as FixedPoint;
  }
}

const _abi = [
  {
    inputs: [],
    name: "Q112",
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
    inputs: [],
    name: "RESOLUTION",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60b9610025600b82828239805160001a60731461001857fe5b30600052607381538281f3fe7300000000000000000000000000000000000000003014608060405260043610603d5760003560e01c80633bf7a83e146042578063552f888a14605a575b600080fd5b60486076565b60408051918252519081900360200190f35b6060607e565b6040805160ff9092168252519081900360200190f35b600160701b81565b60708156fea2646970667358221220ff91dc3673f121740c123f4dbfbfae169aee4ff8b95ce9ba553ad41daa0f3acf64736f6c63430007050033";
