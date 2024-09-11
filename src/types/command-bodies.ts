import { AgentSign, Commands, CorrectionType, SignCalculationObject, SignMethodCalculation, TaxVariant, TypeCheck } from "./states.enum";

export interface GetDataKKTBody {
  InnKkm?: string,
  TaxVariant?: TaxVariant,
  NumDevice?: number,
  IdCommand?: string,
}

export interface OpenShiftBody {
  NotPrint?: boolean;
  IdDevice?: string;
  InnKkm?: string;
  TaxVariant?: TaxVariant;
  NumDevice?: number;
  CashierName?: string;
  CashierVATIN?: string;
  IdCommand?: string;
  Timeout?: number;
}

export interface CloseShiftBody {
  NotPrint?: boolean;
  IdDevice?: string;
  InnKkm?: string;
  TaxVariant?: TaxVariant;
  NumDevice?: number;
  CashierName?: string;
  CashierVATIN?: string;
  IdCommand?: string;
  Timeout?: number;
}

export interface XReportBody {
  InnKkm?: string;
  TaxVariant?: TaxVariant;
  NumDevice?: number;
  IdCommand?: string;
  Timeout?: number;
}

export interface RegisterCheckBody {
  IdCommand: string,
  TypeCheck: TypeCheck,
  ClientAddress: string,
  ClientInfo: string,
  ClientINN: string,
  PayByProcessing: boolean | null,
  ReceiptNumber: string,
  PrintSlipAfterCheck: boolean,
  PrintSlipForCashier: boolean,
  CheckStrings: CheckString[],
  Cash: number,
  ElectronicPayment : number,
  AdvancePayment: number,
  Credit: number,
  CashProvision: number,
  NumDeviceByProcessing: number | null,
  IsFiscalCheck?: boolean,
  NotPrint?: boolean,
  NumberCopies?: number,
  UserAttribute?: UserAttribute,
  AdditionalAttribute?: string,
  RRNCode?: string,
  AuthorizationCode?: string,
  CorrectionType?: CorrectionType,
  CorrectionBaseDate?: string,
  CorrectionBaseNumber?: string,
  SenderEmail?: string,
  AddressSettle?: string,
  PlaceMarket?: string,
  NumDevice?: number | null,
  InnKkm?: string,
  KktNumber?: string,
  TaxVariant?: TaxVariant,
  Timeout?: number,
  CashierName?: string,
  CashierVatin?: string,
}

interface UserAttribute {
  Name: string,
  Value: string,
}

export interface CheckString {
  PrintText?: PrintText,
  PrintImage?: PrintImage,
  Register?: Register,
  BarCode?: BarCode,
}

interface PrintText {
  Text: string,
  Font?: number,
  Intensity?: number,
}

interface PrintImage {
  Image: string,
}

interface Register {
  Name: string,
  Quantity: number,
  Price: number,
  Amount: number,
  Department: number,
  Tax: number,
  SignMethodCalculation: SignMethodCalculation,
  SignCalculationObject: SignCalculationObject,
  MeasureOfQuantity?: number,
  PackageQuantity?: number | null,
  CountryOfOrigin?: string,
  CustomsDeclaration?: string,
  ExciseAmount?: number | null,
  GoodCodeData?: GoodCodeData,
  AgentSign?: AgentSign,
  AgentData?: AgentData,
  PurveyorData?: PurveyorData,
  AdditionalAttribute?: string,
  MeasurementUnit?: string,
}

interface GoodCodeData {
  BarCode: string,
  ContainsSerialNumber: boolean,
  AcceptOnBad: boolean,
}

interface AgentData {
  PayingAgentOperation: string,
  PayingAgentPhone: string,
  ReceivePaymentsOperatorPhone: string,
  MoneyTransferOperatorPhone: string,
  MoneyTransferOperatorName: string,
  MoneyTransferOperatorAddress: string,
  MoneyTransferOperatorVATIN: string,
}

interface PurveyorData {
  PurveyorPhone: string,
  PurveyorName: string,
  PurveyorVATIN: string,
}

interface BarCode {
  BarcodeType: string,
  Barcode: string,
}

export interface CommandBody {
  Command: Commands,
}

export type Bodies = GetDataKKTBody | OpenShiftBody | CloseShiftBody | XReportBody | RegisterCheckBody;