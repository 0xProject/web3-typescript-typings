declare module 'web3' {

    import * as BigNumber from 'bignumber.js';

    class Web3 {
        public static providers: typeof providers;

        public constructor(provider?: Web3.Provider);

        public version: Web3.VersionApi;
        public eth: Web3.EthApi;
        public personal: Web3.PersonalApi | undefined;

        public personal: {
            listAccounts: string[];
            newAccount(password: string): string;
            unlockAccount(address: string, password: string, duration: number): boolean;
            lockAccount(address: string): boolean;
            sign(message: string, account: string, password: string): string;
        }

        public isConnected(): boolean;
        public setProvider(provider: Web3.Provider): void;
        public currentProvider: Web3.Provider;
        public reset(keepIsSyncing: boolean): void;
        public sha3(value: string, options?: Web3.Sha3Options): string;
        public toHex(value: string|number|Object|Array<any>|BigNumber.BigNumber): string;
        public toAscii(hexString: string): string;
        public fromAscii(value: string, padding?: number): string;
        public toDecimal(hexString: string): number;
        public fromDecimal(number: number|string): string;
        public fromWei(amount: number|string|BigNumber.BigNumber, unit: string): string|BigNumber.BigNumber;
        public toWei(amount: number|string|BigNumber.BigNumber, unit: string): string|BigNumber.BigNumber;
        public toBigNumber(numberOrHexString: number|string): BigNumber.BigNumber;
        public isAddress(address: string): boolean;
    }

    namespace providers {
        class HttpProvider implements Web3.Provider {
            constructor(url?: string);
        }
    }

    namespace Web3 {
        type ContractAbi = Array<AbiDefinition>;

        type AbiDefinition = FunctionDescription|EventDescription;

        interface FunctionDescription {
            type: 'function'|'constructor'|'fallback';
            name?: string;
            inputs: Array<FunctionParameter>;
            outputs?: Array<FunctionParameter>;
            constant?: boolean;
            payable?: boolean;
        }

        interface EventParameter {
            name: string;
            type: string;
            indexed: boolean;
        }

        interface EventDescription {
            type: 'event';
            name: string;
            inputs: Array<EventParameter>;
            anonymous: boolean;
        }

        interface FunctionParameter {
            name: string;
            type: string;
        }

        interface Contract<A> {
            at(address: string): A;
        }

        interface FilterObject {
            fromBlock: number|string;
            toBlock: number|string;
            address: string;
            topics: string[];
        }

        interface SolidityEvent<A> {
            event: string;
            address: string;
            args: A;
        }

        interface FilterResult {
            get(callback: () => void): void;
            watch<A>(callback: (error: string|null, result: SolidityEvent<A>) => void): void;
            stopWatching(callback: () => void): void;
        }

        interface Provider {}

        interface Sha3Options {
            encoding: string;
        }

        interface EthApi {
          coinbase: string;
          defaultAccount: string;
          compile: {
            solidity(sourceString: string, cb?: (err: any, result: any) => void): object,
          };
          blockNumber: number;
          sign(address: string, message: string, callback: (err: Error, signData: string) => void): string;
          getBlock(blockHash: string, callback: (err: Error, blockObj: any) => void): BigNumber.BigNumber;
          getBlockNumber(callback: (err: Error, blockNumber: number) => void): void;
          contract<A>(abi: Web3.ContractAbi): Web3.Contract<A>;
          getBalance(addressHexString: string,
                     callback?: (err: any, result: BigNumber.BigNumber) => void): BigNumber.BigNumber;
          getCode(addressHexString: string,
                  callback?: (err: any, code: string) => void): string;
          filter(value: string|Web3.FilterObject): Web3.FilterResult;
          getAccounts(callback: (err: Error, value: any) => void): string[];
          sendTransaction(txData: any, callback: (err: Error, value: any) => void): void;
          getTransactionReceipt(txHash: string, callback: (err: Error, receipt: any) => void): void;
        }

        interface VersionApi {
          getNetwork(cd: (err: Error, networkId: string) => void): void;
          getNode(cd: (err: Error, nodeVersion: string) => void): void;
        }

        interface PersonalApi {
          listAccounts: string[] | undefined;
          newAccount(password?: string): string;
          unlockAccount(address: string, password?: string, duration?: number): boolean
          lockAccount(address: string): boolean
        }
    }
    /* tslint:disable */
    export = Web3;
    /* tslint:enable */
}
