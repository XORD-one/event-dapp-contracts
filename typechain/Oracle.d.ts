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
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface OracleInterface extends ethers.utils.Interface {
  functions: {
    "PHNX()": FunctionFragment;
    "UNISWAP_V2_FACTORY()": FunctionFragment;
    "USDC()": FunctionFragment;
    "USDT()": FunctionFragment;
    "WMATIC()": FunctionFragment;
    "_calculate(uint256,uint256,uint32,address)": FunctionFragment;
    "cummulativeAveragePrice(address)": FunctionFragment;
    "cummulativeAveragePriceReserve(address)": FunctionFragment;
    "cummulativeEthPrice(address)": FunctionFragment;
    "cummulativeEthPriceReserve(address)": FunctionFragment;
    "fetch(address)": FunctionFragment;
    "fetchPhnxPrice()": FunctionFragment;
    "lastTokenTimestamp(address)": FunctionFragment;
    "setValues(address)": FunctionFragment;
    "tokenToTimestampLast(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "PHNX", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "UNISWAP_V2_FACTORY",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "USDC", values?: undefined): string;
  encodeFunctionData(functionFragment: "USDT", values?: undefined): string;
  encodeFunctionData(functionFragment: "WMATIC", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "_calculate",
    values: [BigNumberish, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "cummulativeAveragePrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "cummulativeAveragePriceReserve",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "cummulativeEthPrice",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "cummulativeEthPriceReserve",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "fetch", values: [string]): string;
  encodeFunctionData(
    functionFragment: "fetchPhnxPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lastTokenTimestamp",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "setValues", values: [string]): string;
  encodeFunctionData(
    functionFragment: "tokenToTimestampLast",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "PHNX", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "UNISWAP_V2_FACTORY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "USDC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "USDT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "WMATIC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_calculate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "cummulativeAveragePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cummulativeAveragePriceReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cummulativeEthPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "cummulativeEthPriceReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fetch", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "fetchPhnxPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastTokenTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setValues", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenToTimestampLast",
    data: BytesLike
  ): Result;

  events: {
    "AssetValue(uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AssetValue"): EventFragment;
}

export class Oracle extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: OracleInterface;

  functions: {
    PHNX(overrides?: CallOverrides): Promise<[string]>;

    "PHNX()"(overrides?: CallOverrides): Promise<[string]>;

    UNISWAP_V2_FACTORY(overrides?: CallOverrides): Promise<[string]>;

    "UNISWAP_V2_FACTORY()"(overrides?: CallOverrides): Promise<[string]>;

    USDC(overrides?: CallOverrides): Promise<[string]>;

    "USDC()"(overrides?: CallOverrides): Promise<[string]>;

    USDT(overrides?: CallOverrides): Promise<[string]>;

    "USDT()"(overrides?: CallOverrides): Promise<[string]>;

    WMATIC(overrides?: CallOverrides): Promise<[string]>;

    "WMATIC()"(overrides?: CallOverrides): Promise<[string]>;

    _calculate(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { assetValue: BigNumber }>;

    "_calculate(uint256,uint256,uint32,address)"(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { assetValue: BigNumber }>;

    cummulativeAveragePrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "cummulativeAveragePrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    cummulativeAveragePriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "cummulativeAveragePriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    cummulativeEthPrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "cummulativeEthPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    cummulativeEthPriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "cummulativeEthPriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    fetch(token: string, overrides?: Overrides): Promise<ContractTransaction>;

    "fetch(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    fetchPhnxPrice(overrides?: Overrides): Promise<ContractTransaction>;

    "fetchPhnxPrice()"(overrides?: Overrides): Promise<ContractTransaction>;

    lastTokenTimestamp(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "lastTokenTimestamp(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[number]>;

    setValues(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setValues(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    tokenToTimestampLast(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[number]>;

    "tokenToTimestampLast(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[number]>;
  };

  PHNX(overrides?: CallOverrides): Promise<string>;

  "PHNX()"(overrides?: CallOverrides): Promise<string>;

  UNISWAP_V2_FACTORY(overrides?: CallOverrides): Promise<string>;

  "UNISWAP_V2_FACTORY()"(overrides?: CallOverrides): Promise<string>;

  USDC(overrides?: CallOverrides): Promise<string>;

  "USDC()"(overrides?: CallOverrides): Promise<string>;

  USDT(overrides?: CallOverrides): Promise<string>;

  "USDT()"(overrides?: CallOverrides): Promise<string>;

  WMATIC(overrides?: CallOverrides): Promise<string>;

  "WMATIC()"(overrides?: CallOverrides): Promise<string>;

  _calculate(
    latestCommulative: BigNumberish,
    oldCommulative: BigNumberish,
    timeElapsed: BigNumberish,
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "_calculate(uint256,uint256,uint32,address)"(
    latestCommulative: BigNumberish,
    oldCommulative: BigNumberish,
    timeElapsed: BigNumberish,
    token: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cummulativeAveragePrice(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "cummulativeAveragePrice(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cummulativeAveragePriceReserve(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "cummulativeAveragePriceReserve(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cummulativeEthPrice(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "cummulativeEthPrice(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  cummulativeEthPriceReserve(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "cummulativeEthPriceReserve(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  fetch(token: string, overrides?: Overrides): Promise<ContractTransaction>;

  "fetch(address)"(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  fetchPhnxPrice(overrides?: Overrides): Promise<ContractTransaction>;

  "fetchPhnxPrice()"(overrides?: Overrides): Promise<ContractTransaction>;

  lastTokenTimestamp(arg0: string, overrides?: CallOverrides): Promise<number>;

  "lastTokenTimestamp(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<number>;

  setValues(token: string, overrides?: Overrides): Promise<ContractTransaction>;

  "setValues(address)"(
    token: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  tokenToTimestampLast(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<number>;

  "tokenToTimestampLast(address)"(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<number>;

  callStatic: {
    PHNX(overrides?: CallOverrides): Promise<string>;

    "PHNX()"(overrides?: CallOverrides): Promise<string>;

    UNISWAP_V2_FACTORY(overrides?: CallOverrides): Promise<string>;

    "UNISWAP_V2_FACTORY()"(overrides?: CallOverrides): Promise<string>;

    USDC(overrides?: CallOverrides): Promise<string>;

    "USDC()"(overrides?: CallOverrides): Promise<string>;

    USDT(overrides?: CallOverrides): Promise<string>;

    "USDT()"(overrides?: CallOverrides): Promise<string>;

    WMATIC(overrides?: CallOverrides): Promise<string>;

    "WMATIC()"(overrides?: CallOverrides): Promise<string>;

    _calculate(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "_calculate(uint256,uint256,uint32,address)"(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeAveragePrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeAveragePrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeAveragePriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeAveragePriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeEthPrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeEthPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeEthPriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeEthPriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fetch(token: string, overrides?: CallOverrides): Promise<BigNumber>;

    "fetch(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fetchPhnxPrice(overrides?: CallOverrides): Promise<BigNumber>;

    "fetchPhnxPrice()"(overrides?: CallOverrides): Promise<BigNumber>;

    lastTokenTimestamp(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<number>;

    "lastTokenTimestamp(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<number>;

    setValues(token: string, overrides?: CallOverrides): Promise<void>;

    "setValues(address)"(
      token: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenToTimestampLast(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<number>;

    "tokenToTimestampLast(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<number>;
  };

  filters: {
    AssetValue(undefined: null, undefined: null): EventFilter;
  };

  estimateGas: {
    PHNX(overrides?: CallOverrides): Promise<BigNumber>;

    "PHNX()"(overrides?: CallOverrides): Promise<BigNumber>;

    UNISWAP_V2_FACTORY(overrides?: CallOverrides): Promise<BigNumber>;

    "UNISWAP_V2_FACTORY()"(overrides?: CallOverrides): Promise<BigNumber>;

    USDC(overrides?: CallOverrides): Promise<BigNumber>;

    "USDC()"(overrides?: CallOverrides): Promise<BigNumber>;

    USDT(overrides?: CallOverrides): Promise<BigNumber>;

    "USDT()"(overrides?: CallOverrides): Promise<BigNumber>;

    WMATIC(overrides?: CallOverrides): Promise<BigNumber>;

    "WMATIC()"(overrides?: CallOverrides): Promise<BigNumber>;

    _calculate(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "_calculate(uint256,uint256,uint32,address)"(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeAveragePrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeAveragePrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeAveragePriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeAveragePriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeEthPrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeEthPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    cummulativeEthPriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "cummulativeEthPriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    fetch(token: string, overrides?: Overrides): Promise<BigNumber>;

    "fetch(address)"(token: string, overrides?: Overrides): Promise<BigNumber>;

    fetchPhnxPrice(overrides?: Overrides): Promise<BigNumber>;

    "fetchPhnxPrice()"(overrides?: Overrides): Promise<BigNumber>;

    lastTokenTimestamp(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "lastTokenTimestamp(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setValues(token: string, overrides?: Overrides): Promise<BigNumber>;

    "setValues(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    tokenToTimestampLast(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "tokenToTimestampLast(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    PHNX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "PHNX()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    UNISWAP_V2_FACTORY(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "UNISWAP_V2_FACTORY()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    USDC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "USDC()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "USDT()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WMATIC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "WMATIC()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _calculate(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "_calculate(uint256,uint256,uint32,address)"(
      latestCommulative: BigNumberish,
      oldCommulative: BigNumberish,
      timeElapsed: BigNumberish,
      token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cummulativeAveragePrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "cummulativeAveragePrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cummulativeAveragePriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "cummulativeAveragePriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cummulativeEthPrice(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "cummulativeEthPrice(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    cummulativeEthPriceReserve(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "cummulativeEthPriceReserve(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    fetch(token: string, overrides?: Overrides): Promise<PopulatedTransaction>;

    "fetch(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    fetchPhnxPrice(overrides?: Overrides): Promise<PopulatedTransaction>;

    "fetchPhnxPrice()"(overrides?: Overrides): Promise<PopulatedTransaction>;

    lastTokenTimestamp(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "lastTokenTimestamp(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setValues(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setValues(address)"(
      token: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    tokenToTimestampLast(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "tokenToTimestampLast(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
