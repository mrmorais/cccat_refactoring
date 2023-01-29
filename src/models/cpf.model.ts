export class InvalidCPFException extends Error {
  constructor() {
    super('O CPF informado é inválido');
  }
}

export class CPF {
  static ALLOWED_SIZE = 11;
  static FORMAT_REGEX = /(\d{3})(\d{3})(\d{3})(\d{2})/;

  private normalizedCpf: string;

  constructor(cpf: string) {
    const isValid = CPF.validate(cpf);

    if (!isValid) throw new InvalidCPFException();

    this.normalizedCpf = CPF.parseCpf(cpf).join('');
  }

  getFormated(): string {
    return this.normalizedCpf.replaceAll(CPF.FORMAT_REGEX, "$1.$2.$3-$4");
  }

  private static parseCpf(cpf: string): number[] {
    return (cpf.match(/\d/g) ?? []).map(stringDigit => Number.parseInt(stringDigit));
  }

  static calculateDigit(originPart: number[]): number {
    const { digitSumTotal } = originPart.reduceRight(({ digitSumTotal, currentMultiplier }, currentDigit: number) => {
      return {
        digitSumTotal: digitSumTotal + currentDigit * currentMultiplier,
        currentMultiplier: currentMultiplier + 1,
      };
    }, { digitSumTotal: 0, currentMultiplier: 2});


    const digitRest = digitSumTotal % CPF.ALLOWED_SIZE;
    const digit = digitRest < 2 ? 0 : CPF.ALLOWED_SIZE - digitRest;

    return digit;
  }

  static validate(cpf: string): boolean {
    if (!cpf) return false;

    const parsedCpf = this.parseCpf(cpf);
    if (parsedCpf.length !== CPF.ALLOWED_SIZE) false;

    if (parsedCpf.every((char) => char === parsedCpf[0])) return false;

    const cpfFirstPart = parsedCpf.slice(0, 9);

    const firstDigit = this.calculateDigit(cpfFirstPart);
    const secondDigit = this.calculateDigit(cpfFirstPart.concat(firstDigit));

    return parsedCpf.at(9) === firstDigit
        && parsedCpf.at(10) === secondDigit;
  }

}
