export enum Commands {
  GetDataKKT = "GetDataKKT",
  RegisterCheck = "RegisterCheck",
  OpenShift = "OpenShift",
  CloseShift = "CloseShift",
  XReport = "XReport",
  GetDataCheck = "GetDataCheck",
  GetRezult = "GetRezult",
  DepositingCash = "DepositingCash",
  PaymentCash = "PaymentCash",
}

export enum CommandStatus {
  Ok,
  Run,
  Error,
  NotFound,
  NotRun,
}

// Статус сессии 1-Закрыта, 2-Открыта, 3-Открыта, но закончилась
export enum ShiftStatus {
  Closed = 1,
  Opened,
  Expired,
}

export enum TypeCheck {
  Sale,
  Refund,
  SalesCorrection,
  RefundCorrection,
}

// Система налогообложения (СНО) применяемая для чека, Тег 1055
// Если не указанно - система СНО настроенная в ККМ по умолчанию
// 0: Общая ОСН
// 1: Упрощенная УСН (Доход)
// 2: Упрощенная УСН (Доход минус Расход)
// 3: Единый налог на вмененный доход ЕНВД
// 4: Единый сельскохозяйственный налог ЕСН
// 5: Патентная система налогообложения
// Комбинация разных СНО не возможна
// Надо указывать если ККМ настроена на несколько систем СНО
export enum TaxVariant {
  General,
  SimplifiedIncome,
  SimplifiedIncomeMinusCost,
  UnifiedTaxOnImputedIncome,
  UnifiedAgriculturalTax,
  PatentSystem,
}

export enum CorrectionType {
  Self, //самостоятельно
  Prescription, //по предписанию
}

// Признак способа расчета. Тег ОФД 1214. Для ФФД.1.05 и выше обязательное поле
// 1: "ПРЕДОПЛАТА 100% (Полная предварительная оплата до момента передачи предмета расчета)"
// 2: "ПРЕДОПЛАТА (Частичная предварительная оплата до момента передачи предмета расчета)"
// 3: "АВАНС"
// 4: "ПОЛНЫЙ РАСЧЕТ (Полная оплата, в том числе с учетом аванса в момент передачи предмета расчета)"
// 5: "ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ (Частичная оплата предмета расчета в момент его передачи с последующей оплатой в кредит )"
// 6: "ПЕРЕДАЧА В КРЕДИТ (Передача предмета расчета без его оплаты в момент его передачи с последующей оплатой в кредит)"
// 7: "ОПЛАТА КРЕДИТА (Оплата предмета расчета после его передачи с оплатой в кредит )"
export enum SignMethodCalculation {
  FullPrepayment = 1,
  PartialPrepayment,
  Advance,
  FullPayment,
  PartialPaymentAndCredit,
  TransferCredit,
  PaymentCredit,
}

// Признак предмета расчета. Тег ОФД 1212. Для ФФД.1.05 и выше обязательное поле
// 1: "ТОВАР (наименование и иные сведения, описывающие товар)"
// 2: "ПОДАКЦИЗНЫЙ ТОВАР (наименование и иные сведения, описывающие товар)"
// 3: "РАБОТА (наименование и иные сведения, описывающие работу)"
// 4: "УСЛУГА (наименование и иные сведения, описывающие услугу)"
// 5: "СТАВКА АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
// 6: "ВЫИГРЫШ АЗАРТНОЙ ИГРЫ (при осуществлении деятельности по проведению азартных игр)"
// 7: "ЛОТЕРЕЙНЫЙ БИЛЕТ (при осуществлении деятельности по проведению лотерей)"
// 8: "ВЫИГРЫШ ЛОТЕРЕИ (при осуществлении деятельности по проведению лотерей)"
// 9: "ПРЕДОСТАВЛЕНИЕ РИД (предоставлении прав на использование результатов интеллектуальной деятельности или средств индивидуализации)"
// 10: "ПЛАТЕЖ (аванс, задаток, предоплата, кредит, взнос в счет оплаты, пени, штраф, вознаграждение, бонус и иной аналогичный предмет расчета)"
// 11: "АГЕНТСКОЕ ВОЗНАГРАЖДЕНИЕ (вознаграждение (банковского)платежного агента/субагента, комиссионера, поверенного или иным агентом)"
// 12: "СОСТАВНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, состоящем из предметов, каждому из которых может быть присвоено вышестоящее значение"
// 13: "ИНОЙ ПРЕДМЕТ РАСЧЕТА (предмет расчета, не относящемуся к предметам расчета, которым может быть присвоено вышестоящее значение"
// 14: "ИМУЩЕСТВЕННОЕ ПРАВО" (передача имущественных прав)
// 15: "ВНЕРЕАЛИЗАЦИОННЫЙ ДОХОД"
// 16: "СТРАХОВЫЕ ВЗНОСЫ" (суммы расходов, уменьшающих сумму налога (авансовых платежей) в соответствии с пунктом 3.1 статьи 346.21 Налогового кодекса Российской Федерации)
// 17: "ТОРГОВЫЙ СБОР" (суммы уплаченного торгового сбора)
// 18: "КУРОРТНЫЙ СБОР"
// 19: "ЗАЛОГ"
// 20: "РАСХОД" - суммы произведенных расходов в соответствии со статьей 346.16 Налогового кодекса Российской Федерации, уменьшающих доход
// 21: "ВЗНОСЫ НА ОБЯЗАТЕЛЬНОЕ ПЕНСИОННОЕ СТРАХОВАНИЕ ИП" или "ВЗНОСЫ НА ОПС ИП"
// 22: "ВЗНОСЫ НА ОБЯЗАТЕЛЬНОЕ ПЕНСИОННОЕ СТРАХОВАНИЕ" или "ВЗНОСЫ НА ОПС"
// 23: "ВЗНОСЫ НА ОБЯЗАТЕЛЬНОЕ МЕДИЦИНСКОЕ СТРАХОВАНИЕ ИП" или "ВЗНОСЫ НА ОМС ИП"
// 24: "ВЗНОСЫ НА ОБЯЗАТЕЛЬНОЕ МЕДИЦИНСКОЕ СТРАХОВАНИЕ" или "ВЗНОСЫ НА ОМС"
// 25: "ВЗНОСЫ НА ОБЯЗАТЕЛЬНОЕ СОЦИАЛЬНОЕ СТРАХОВАНИЕ" или "ВЗНОСЫ НА ОСС"
// 26: "ПЛАТЕЖ КАЗИНО" прием и выплата денежных средств при осуществлении казино и залами игровых автоматов расчетов с использованием обменных знаков игорного заведения
export enum SignCalculationObject {
  Product = 1,
  ExciseProduct,
  Work,
  Service,
  RateGambling,
  WinGambling,
  LotteryTicket,
  LotteryWin,
  ProvideRight,
  Payment,
  AgentReward,
  CompositeCalculationObject,
  OtherCalculationObject,
  PropertyRight,
  NonOperatingIncome,
  InsuranceContributions,
  TradeFee,
  ResortFee,
  Deposit,
  Expense,
  PensionInsuranceContributionsIP,
  PensionInsuranceContributions,
  MedicalInsuranceContributionsIP,
  MedicalInsuranceContributions,
  SocialInsuranceContributions,
  CasinoPayment,
}

// Признак агента. Тег ОФД 1222. Поле не обязательное. Можно вообще не указывать.
// 0: "Банковский платежный агент:" Оказание услуг пользователем, являющимся банковским платежным агентом
// 1: "Банковский платежный субагент:" Оказание услуг пользователем, являющимся банковским платежным субагентом
// 2: "Платежный агент:" Оказание услуг пользователем, являющимся платежным агентом
// 3: "Платежный субагент:" Оказание услуг пользователем, являющимся платежным субагентом
// 4: "Поверенный:" Оказание услуг пользователем, являющимся поверенным
// 5: "Комиссионер:" Оказание услуг пользователем, являющимся комиссионером
// 6: "Агент:" Оказание услуг пользователем, являющимся агентом и не являющимся банковским платежным агентом (субагентом), платежным агентом (субагентом), поверенным, комиссионером
export enum AgentSign {
  BankPaymentAgent,
  BankPaymentSubagent,
  PaymentAgent,
  PaymentSubagent,
  Attorney,
  Commissioner,
  Agent,
}