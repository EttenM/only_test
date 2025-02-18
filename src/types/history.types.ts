export interface HistoryData {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  event: Event[];
}

export interface Event {
  year: string;
  description: string;
}

export type HistoryDataWithoutEvent = Omit<HistoryData[], "event">;
