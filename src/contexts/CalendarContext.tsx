import React, {createContext, useMemo, useState} from 'react';
import {EventInterface} from '../interfaces';
const initialEvents: EventInterface[] = [];
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
