import type { FormValues } from '@/components/Form/main';

type Frequency = 'annually' | 'monthly' | 'fortnightly';

/** 频率换算为“年度金额” */
const convertToAnnual = (amount: number, frequency: Frequency): number => {
  switch (frequency) {
    case 'annually':
      return amount;
    case 'monthly':
      return amount * 12;
    case 'fortnightly':
      return amount * 26; // 一年约26个双周
    default:
      return amount;
  }
};

export type PropertyBreakdown = {
  index: number; // 序号（从0开始）
  annualRentalIncome: number; // 年度化租金收入

  // 各项支出（全部年度化后）
  managementFee: number;
  estimateExpense: number;
  depreciation: number;
  rate: number;
  landTax: number;
  insurance: number;
  interest: number;

  totalExpenses: number; // 总支出
  netIncome: number; // 净收入 = 年租金 - 总支出
};

export type Overall = {
  totalRentalIncome: number; // 所有房的总租金（年度化后）
  totalExpenses: number; // 所有房的总支出
  netIncome: number; // 总净收入
  breakdown: {
    // 各项支出的汇总
    managementFee: number;
    estimateExpense: number;
    depreciation: number;
    rate: number;
    landTax: number;
    insurance: number;
    interest: number;
  };
};

export const calculatePropertyBalance = (
  data: FormValues
): {
  overall: Overall;
  perProperty: PropertyBreakdown[];
} => {
  // 逐套房产计算（便于 UI 按房展示）
  const perProperty: PropertyBreakdown[] = data.properties.map(
    (property, index) => {
      const rentalIncome = Number(property.rentalIncome.amount) || 0;
      const managementFeePct = Number(property.managementFeePct) || 0;
      const estimateExpense = Number(property.estimateExpense) || 0;
      const depreciation = Number(property.depreciation) || 0;
      const rate = Number(property.rate) || 0;
      const landTax = Number(property.landTax) || 0;
      const insuranceAmount = Number(property.insurance.amount) || 0;
      const interestAmount = Number(property.interest.amount) || 0;

      // 年度化金额
      const annualRentalIncome = convertToAnnual(
        rentalIncome,
        property.rentalIncome.frequency
      );
      const annualInsurance = convertToAnnual(
        insuranceAmount,
        property.insurance.frequency
      );
      const annualInterest = convertToAnnual(
        interestAmount,
        property.interest.frequency
      );

      // 管理费：按“租金 * 百分比”
      // 注意：这里沿用你的原逻辑，以“输入的 rentalIncome”为基数。
      // 若你要按“年度租金”为基数，请改成 annualRentalIncome * (managementFeePct / 100)
      const managementFee = rentalIncome * (managementFeePct / 100);

      const totalExpenses =
        managementFee +
        estimateExpense +
        depreciation +
        rate +
        landTax +
        annualInsurance +
        annualInterest;

      const netIncome = annualRentalIncome - totalExpenses;

      return {
        index,
        annualRentalIncome,
        managementFee,
        estimateExpense,
        depreciation,
        rate,
        landTax,
        insurance: annualInsurance,
        interest: annualInterest,
        totalExpenses,
        netIncome,
      };
    }
  );

  // 汇总得到 overall
  const overall = perProperty.reduce<Overall>(
    (acc, p) => {
      acc.totalRentalIncome += p.annualRentalIncome;
      acc.breakdown.managementFee += p.managementFee;
      acc.breakdown.estimateExpense += p.estimateExpense;
      acc.breakdown.depreciation += p.depreciation;
      acc.breakdown.rate += p.rate;
      acc.breakdown.landTax += p.landTax;
      acc.breakdown.insurance += p.insurance;
      acc.breakdown.interest += p.interest;
      acc.totalExpenses += p.totalExpenses;
      acc.netIncome += p.netIncome;
      return acc;
    },
    {
      totalRentalIncome: 0,
      totalExpenses: 0,
      netIncome: 0,
      breakdown: {
        managementFee: 0,
        estimateExpense: 0,
        depreciation: 0,
        rate: 0,
        landTax: 0,
        insurance: 0,
        interest: 0,
      },
    }
  );

  return { overall, perProperty };
};

export const fmtCurrency = (n: number) =>
  new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 2,
  }).format(n);
