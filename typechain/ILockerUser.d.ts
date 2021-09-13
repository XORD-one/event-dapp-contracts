/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ILockerUserInterface extends ethers.utils.Interface {
  functions: {
    "locker()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "locker", values?: undefined): string;

  decodeFunctionResult(functionFragment: "locker", data: BytesLike): Result;

  events: {};
}

export class ILockerUser extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ILockerUserInterface;

  functions: {
    locker(overrides?: CallOverrides): Promise<[string]>;

    "locker()"(overrides?: CallOverrides): Promise<[string]>;
  };

  locker(overrides?: CallOverrides): Promise<string>;

  "locker()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    locker(overrides?: CallOverrides): Promise<string>;

    "locker()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    locker(overrides?: CallOverrides): Promise<BigNumber>;

    "locker()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    locker(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "locker()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}