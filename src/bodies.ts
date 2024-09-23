import { KKMClient } from "./client";
import { GetDataKKTBody, CommandBody, OpenShiftBody, CloseShiftBody, XReportBody, RegisterCheckBody, GetDataCheckBody, PaymentCashBody, DepositingCashBody } from "./types/command-bodies";
import { Commands } from "./types/states.enum";

export class CommandBodies extends KKMClient {
	constructor(kkmClient?: KKMClient) {
    if (kkmClient) {
      super(
        kkmClient.url,
        kkmClient.innKkm,
        kkmClient.kktNumber,
        kkmClient.cashierName,
        kkmClient.cashierVatin,
        kkmClient.numDevice,
        kkmClient.taxVariant,
        kkmClient.commandTimeout,
      );
    } else {
      throw new Error('Не передан экземпляр KKMClient');
    }
  }

	/**
	 * Тело получения текущего состояние ККТ
	 */
	getDataKKTBody(body: GetDataKKTBody): GetDataKKTBody & CommandBody {
		return {
			Command: Commands.GetDataKKT,
			InnKkm: this.innKkm,
			TaxVariant: this.taxVariant,
			NumDevice: this.numDevice,
			IdCommand: this.generateUUID(),
			...body,
		}
	}

	/**
	 * Тело открытия смены
	 * @param {OpenShiftBody} body - Тело запроса
	 */
	openShiftBody(body: OpenShiftBody): OpenShiftBody & CommandBody {
		return {
			Command: Commands.OpenShift,
			NotPrint: false,
			IdDevice: '',
			...this.getDefaultCheckParams(),
			...body,
		}
	}

	/**
	 * Тело закрытия смены
	 * @param {CloseShiftBody} body - Тело запроса
	 */
	closeShiftBody(body: CloseShiftBody): CloseShiftBody & CommandBody {
		return {
			Command: Commands.CloseShift,
			NotPrint: false,
			IdDevice: '',
			...this.getDefaultCheckParams(),
			...body,
		}
	}

	/**
	 * Тело печати X отчета
	 * @param {XReportBody} body - Тело запроса
	 */
	xReportBody(body: XReportBody): XReportBody & CommandBody {
		return {
			Command: Commands.XReport,
			...this.getDefaultCheckParams(),
			...body,
		}
	}

	/**
	 * Тело получения данных чека
	 * @param {GetDataCheckBody} body - Тело запроса
	 */
	getDataCheckBody(body: GetDataCheckBody): GetDataCheckBody & CommandBody {
		return {
			Command: Commands.GetDataCheck,
			InnKkm: this.innKkm,
			TaxVariant: this.taxVariant,
			NumDevice: this.numDevice,
			IdCommand: this.generateUUID(),
			...body,
		}
	}

	/**
	 * Тело печати чека
	 * @param {RegisterCheckBody} body - Тело запроса
	 */
	registerCheckBody(body: RegisterCheckBody): RegisterCheckBody & CommandBody {
		return {
			Command: Commands.RegisterCheck,
			IsFiscalCheck: true,
			NotPrint: false,
			NumberCopies: 0,
			...this.getDefaultCheckParams(),
			...body,
		}
	}

	/**
	 * Тело печати чека изъятия денежных средств
	 * @param {PaymentCashBody} body - Тело запроса
	 */
	paymentCashBody(body: PaymentCashBody): PaymentCashBody & CommandBody {
		return {
			Command: Commands.PaymentCash,
			...this.getDefaultCheckParams(),
			...body,
		}
	}

	/**
	 * Тело печати чека внесения денежных средств
	 * @param {DepositingCashBody} body - Тело запроса
	 */
	depositingCashBody(body: DepositingCashBody): DepositingCashBody & CommandBody {
		return {
			Command: Commands.DepositingCash,
			...this.getDefaultCheckParams(),
			...body,
		}
	}
}