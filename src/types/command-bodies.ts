import { AgentSign, Commands, CorrectionType, SignCalculationObject, SignMethodCalculation, TaxVariant, TypeCheck } from "./states.enum";

interface DefaultData {
  InnKkm?: string,
  TaxVariant?: TaxVariant,
  NumDevice?: number,
  IdCommand?: string,
  Timeout?: number,
}

interface CashierData {
  CashierName?: string,
  CashierVatin?: string,
}

export interface GetDataKKTBody extends DefaultData {}

export interface OpenShiftBody extends DefaultData, CashierData {
  NotPrint?: boolean;
  IdDevice?: string;
}

export interface CloseShiftBody extends DefaultData, CashierData {
  NotPrint?: boolean;
  IdDevice?: string;
}

export interface XReportBody extends DefaultData {}

export interface GetDataCheckBody extends DefaultData {
  FiscalNumber: number,
  NumberCopies?: string,
}

export interface RegisterCheckBody extends DefaultData, CashierData {
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
  KktNumber?: string,
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

export interface PaymentCashBody extends DefaultData, CashierData {
  Amount: number,
}

export interface DepositingCashBody extends DefaultData, CashierData {
  Amount: number,
}

export type Bodies =
  GetDataKKTBody
  | OpenShiftBody
  | CloseShiftBody
  | XReportBody
  | RegisterCheckBody
  | GetDataCheckBody
  | PaymentCashBody
  | DepositingCashBody;