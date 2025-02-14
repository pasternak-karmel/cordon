export enum SubscriptionPlan {
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
  CUSTOM = "CUSTOM",
}

export interface SubscriptionOptions {
  plan: SubscriptionPlan;
  customDurationInDays?: number;
}

export class SubscriptionService {
  static calculateEndDate(
    startDate: string,
    options: SubscriptionOptions
  ): string {
    if (!this.isValidDate(startDate)) {
      throw new Error("Invalid start date format. Expected format: YYYY-MM-DD");
    }

    const start = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start > today) {
      throw new Error("Start date cannot be in the future.");
    }

    if (start.getFullYear() < 2020) {
      throw new Error("Start date is too old to be valid.");
    }

    const { plan, customDurationInDays } = options;
    let endDate: string;

    switch (plan) {
      case SubscriptionPlan.MONTHLY:
        endDate = this.addMonths(start, 1);
        break;
      case SubscriptionPlan.QUARTERLY:
        endDate = this.addMonths(start, 3);
        break;
      case SubscriptionPlan.YEARLY:
        endDate = this.addYears(start, 1);
        break;
      case SubscriptionPlan.CUSTOM:
        if (!customDurationInDays || customDurationInDays <= 0) {
          throw new Error("Custom plan requires a positive duration in days.");
        }
        endDate = this.addDays(start, customDurationInDays);
        break;
      default:
        throw new Error("Unsupported subscription plan.");
    }

    if (new Date(endDate) < today) {
      throw new Error(`Subscription already expired on ${endDate}`);
    }

    return endDate;
  }

  private static addMonths(date: Date, months: number): string {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return this.formatDate(newDate);
  }

  private static addYears(date: Date, years: number): string {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return this.formatDate(newDate);
  }

  private static addDays(date: Date, days: number): string {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return this.formatDate(newDate);
  }

  private static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return (
      !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null
    );
  }

  private static formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
