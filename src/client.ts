import { HttpService } from "./api"
import { CloseShiftBody, CommandBody, OpenShiftBody, RegisterCheckBody, XReportBody } from "./types/command-bodies"
import { Commands, CommandStatus } from "./types/states.enum"

export class KKMClient {
  private http: HttpService
	private executePath: string = 'Execute'
	public url: string
	public innKkm: string
	public kktNumber: string
	public cashierName: string
	public cashierVatin: string
	public numDevice?: number | null
	public taxVariant?: string
	public commandTimeout?: number

	constructor(
		url: string,
		innKkm: string,
		kktNumber: string,
		cashierName: string,
		cashierVatin: string,
		numDevice?: number,
		taxVariant?: string,
		commandTimeout?: number,
	) {
		this.url = url || "http://localhost:5893/"
		this.http = new HttpService(this.url)
		this.numDevice = numDevice || null
		this.innKkm = innKkm || ''
		this.kktNumber = kktNumber || ''
		this.cashierName = cashierName || ''
		this.cashierVatin = cashierVatin || ''
		this.taxVariant = taxVariant || ''
		this.commandTimeout = commandTimeout || 60
	}

	/**
	 * Генерирует GUID
	 */
	generateUUID(): string {
    function getRandomHex(): string {
			return (Math.random().toString(16) + "000000").slice(2, 10);
    }
    return (
			getRandomHex() + '-' +
			getRandomHex() + '-' +
			getRandomHex() + '-' +
			getRandomHex() + '-' +
			getRandomHex() + getRandomHex() + getRandomHex()
    );
	}

	/**
	 * Получает текущее состояние ККТ
	 */
	async getDataKKT(): Promise<void> {
		const requestParams = {
			Command: Commands.GetDataKKT,
			InnKkm: this.innKkm,
			TaxVariant: this.taxVariant,
			NumDevice: this.numDevice,
			IdCommand: this.generateUUID(),
		}

		const response = await this.http.post(this.executePath, requestParams);
		return response.data;
	}

	/**
	 * Получает параметры для чека по умолчанию
	 */
	private getDefaultCheckParams(): object {
		return {
			InnKkm: this.innKkm,
			TaxVariant: this.taxVariant,
			NumDevice: this.numDevice,
			CashierName: this.cashierName,
			CashierVatin: this.cashierVatin,
			Timeout: this.commandTimeout,
			IdCommand: this.generateUUID(),
		}
	}

	/**
	 * Открывает смену
	 * @param {OpenShiftBody} body - Тело запроса
	 */
	async openShift(body: OpenShiftBody): Promise<void> {
		const requestParams: OpenShiftBody & CommandBody = {
			Command: Commands.OpenShift,
			NotPrint: false,
			IdDevice: '',
			...this.getDefaultCheckParams(),
			...body,
		}

		const response = await this.http.post(this.executePath, requestParams);
		return response.data;
	}

	/**
	 * Закрывает смену
	 * @param {CloseShiftBody} body - Тело запроса
	 */
	async closeShift(body: CloseShiftBody): Promise<void> {
		const requestParams = {
			Command: Commands.CloseShift,
			NotPrint: false,
			IdDevice: '',
			...this.getDefaultCheckParams(),
			...body,
		}

		const response = await this.http.post(this.executePath, requestParams);
		return response.data;
	}

	/**
	 * Печатает X отчет
	 * @param {XReportBody} body - Тело запроса
	 */
	async xReport(body: XReportBody): Promise<void> {
		const requestParams = {
			Command: Commands.XReport,
			...this.getDefaultCheckParams(),
			...body,
		}

		const response = await this.http.post(this.executePath, requestParams);
		return response.data;
	}

	/**
	 * Печатает чек
	 * @param {RegisterCheckBody} body - Тело запроса
	 */
	async registerCheck(body: RegisterCheckBody): Promise<void> {
		const requestParams = {
			Command: Commands.RegisterCheck,
			IsFiscalCheck: true,
			NotPrint: false,
			NumberCopies: 0,
			...this.getDefaultCheckParams(),
			...body,
		}

		const response = await this.http.post(this.executePath, requestParams);
		return response.data;
	}

	/**
	 * Проверяет статуса ранее отданной команды
	 * @param {String} uuid - Идентификатор задания
	 */
	async getCommandResult(uuid: string): Promise<void> {
		while (true) {
			const requestParams = {
				Command: Commands.GetRezult,
				IdCommand: uuid,
			}

			const response = await this.http.post(this.executePath, requestParams);
		
			if (response.data.results) {
				if (response.data.Rezult.Status === CommandStatus.Run) {
					await new Promise(resolve => setTimeout(resolve, 1000));
				} else {
					return response?.data
				}
			}
		};
	};
}
