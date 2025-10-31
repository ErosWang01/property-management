interface TaxBracket {
  min: number;
  max: number | null;
  baseTax: number;
  rate: number;
}

const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 18200, baseTax: 0, rate: 0 },
  { min: 18201, max: 45000, baseTax: 0, rate: 0.16 },
  { min: 45001, max: 135000, baseTax: 4288, rate: 0.3 },
  { min: 135001, max: 190000, baseTax: 31288, rate: 0.37 },
  { min: 190001, max: null, baseTax: 51638, rate: 0.45 },
];

export function calculateTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  const bracket = TAX_BRACKETS.find(
    (b) => taxableIncome >= b.min && (b.max === null || taxableIncome <= b.max)
  );

  if (!bracket) {
    throw new Error(`无法找到适用于收入 $${taxableIncome} 的税率区间`);
  }

  const tax = bracket.baseTax + (taxableIncome - bracket.min) * bracket.rate;

  return Math.max(0, tax);
}

export function calculateAfterTaxIncome(taxableIncome: number): number {
  const tax = calculateTax(taxableIncome);
  return taxableIncome - tax;
}

export function calculateEffectiveTaxRate(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const tax = calculateTax(taxableIncome);
  return (tax / taxableIncome) * 100;
}
