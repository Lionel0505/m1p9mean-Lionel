export interface IBenefitsFilter {

    page: number;

    limit: number;

    restaurant: string;

    dateRange?: { date1: string, date2: string };

}