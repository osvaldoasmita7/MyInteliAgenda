import React, {createContext, useMemo, useState} from 'react';
import {EventInterface} from '../interfaces';
const initialEvents = [
  {
    allDay: false,
    dateEnd: '2024-07-21T00:00:00.000Z',
    dateStart: '2024-07-21T00:00:00.000Z',
    id: 1,
    name: 'prueba 2',
    timeEnd: '18:14',
    timeStart: '09:14',
    type: 'Aniversario',
  },
];
interface IContextCalendar {
  clearState: () => any;
  types: string[];
  events: EventInterface[];
  setEvents: React.Dispatch<React.SetStateAction<EventInterface[]>>;
}

const initialState = {
  clearState: () => {},
  types: ['Cita', 'Aniversario', 'Cuenta atrás'],
  events: initialEvents,
  setEvents: () => {},
};

export const CalendarContext = createContext<IContextCalendar>(initialState);
interface ChildrenProps {
  children: any;
}
export const CalendarProvider = ({children}: ChildrenProps) => {
  const types = ['Cita', 'Aniversario', 'Cuenta atrás'];
  const [events, setEvents] = useState<EventInterface[]>(initialEvents);
  // const [events, setEvents] = useState<EventInterface[]>([]);

  const clearState = () => {};
  return (
    <CalendarContext.Provider
      value={useMemo(
        () => ({
          clearState,
          setEvents,
          events,
          types,
        }),
        [clearState, setEvents, events, types],
      )}>
      {children}
    </CalendarContext.Provider>
  );
};
