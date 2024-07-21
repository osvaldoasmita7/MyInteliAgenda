export interface EventInterface {
  id?: number;
  name: string;
  type: string;
  timeStart: string;
  timeEnd: string;
  dateStart: string | null;
  dateEnd: string | null;
  allDay: boolean;
  description?: string;
}
export interface ErrorsInterface {
  name: string;
  dateStart: string;
  type: string;
  dateEnd: string;
  timeEnd: string;
  timeStart: string;
}
