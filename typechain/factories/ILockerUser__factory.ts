/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { ILockerUser } from "../ILockerUser";

export class ILockerUser__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ILockerUser {
    return new Contract(address, _abi, signerOrProvider) as ILockerUser;
  }
}

const _abi = [
  {
    inputs: [],
    name: "locker",
    outputs: [
      {
        internalType: "contract ILocker",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
