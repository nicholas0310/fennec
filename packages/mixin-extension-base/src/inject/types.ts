import type {
  ActionPayloads,
  ActionTypesWithNoSubscriptions,
  ActionResponses,
  ActionTypesWithNullPayload,
  ActionTypesWithSubscriptions,
  SubscriptionMessageTypes
} from "../background/types";

export interface Handler {
  resolve: (data?: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
}

export type Handlers = Record<string, Handler>;

export interface SendMessage {
  <T extends ActionTypesWithNullPayload>(action: T): Promise<ActionResponses[T]>;
  <T extends ActionTypesWithNoSubscriptions>(action: T, payload: ActionPayloads[T]): Promise<ActionResponses[T]>;
  <T extends ActionTypesWithSubscriptions>(
    action: T,
    payload: ActionPayloads[T],
    subscriber: (data: SubscriptionMessageTypes[T]) => void
  ): Promise<ActionResponses[T]>;
}

export interface InjectedExtensionInfo {
  name: string;
  version: string;
}

export type InjectOptions = InjectedExtensionInfo;

export interface InjectedAccount {
  name: string;
}

export interface InjectedAccounts {
  get(): Promise<InjectedAccount[]>;
}

export interface InjectedData {
  accounts: InjectedAccounts;
}

type This = typeof globalThis;

export interface InjectedWindow extends This {
  __MIXIN__: Record<string, InjectProvider>;
}

export interface InjectProvider {
  enable: (origin: string) => Promise<InjectedData>;
  version: string;
}