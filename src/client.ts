import { HttpService } from "./api"
import { Bodies } from "./types/command-bodies"
import { Commands, CommandStatus, TaxVariant } from "./types/states.enum"

interface KKMClientSettings {
	url: string,
	innKkm: string,
	kktNumber: string,
	cashierName: string,
	cashierVatin: string,
	numDevice?: number,
	taxVariant?: TaxVariant,
	commandTimeout?: number,
	placeMarket?: string,
	addressSettle?: string,
	commandResultTimeout?: number,
}

export class KKMClient {
  private http: HttpService
	private executePath: string = 'Execute'
	public url: string
	public innKkm: string
	public kktNumber: string
	public cashierName: string
	public cashierVatin: string
	public numDevice?: number
	public taxVariant?: TaxVariant
	public commandTimeout?: number
	public placeMarket?: string
	public addressSettle?: string
	public commandResultTimeout?: number

	constructor(settings: KKMClientSettings) {
		this.url = settings.url || "http://localhost:5893/"
		this.http = new HttpService(this.url)
		this.innKkm = settings.innKkm || ''
		this.kktNumber = settings.kktNumber || ''
		this.cashierName = settings.cashierName || ''
		this.cashierVatin = settings.cashierVatin || ''
		this.taxVariant = settings.taxVariant
		this.numDevice = settings.numDevice
		this.commandTimeout = settings.commandTimeout || 60
		this.placeMarket = settings.placeMarket;
		this.addressSettle = settings.addressSettle;
		this.commandResultTimeout = settings.commandResultTimeout || 1000;
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
	 * Получает параметры для чека по умолчанию
	 */
	protected getDefaultCheckParams(): object {
		return {
			InnKkm: this.innKkm,
			TaxVariant: this.taxVariant,
			NumDevice: this.numDevice,
			CashierName: this.cashierName,
			CashierVatin: this.cashierVatin,
			Timeout: this.commandTimeout,
			PlaceMarket: this.placeMarket,
			AddressSettle: this.addressSettle,
			IdCommand: this.generateUUID(),
		}
	}

	/**
	 * Отправляет комманду на ККМ
	 * @param {Bodies} commandBody - Идентификатор задания
	 */
	async sendCommand(commandBody: Bodies): Promise<void> {
		const response = await this.http.post(this.executePath, commandBody);
		return response?.data
	}

	/**
	 * Проверяет статуса ранее отданной команды
	 * @param {String} uuid - Идентификатор задания
	 */
	async getCommandResult(uuid: string): Promise<void> {
		try {
			while (true) {
				const requestParams = {
					Command: Commands.GetRezult,
					IdCommand: uuid,
				}
	
				const response = await this.http.post(this.executePath, requestParams);
			
				if (response.data?.Rezult) {
					if (response.data.Rezult.Status === CommandStatus.Run) {
						await new Promise(resolve => setTimeout(resolve, this.commandResultTimeout));
					} else {
						return response?.data
					}
				}
			};
		} catch (error) {
			return Promise.reject(error);
		}
	};
}
