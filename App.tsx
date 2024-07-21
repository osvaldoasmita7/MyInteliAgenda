import React from 'react';
import {Router} from './src/router/Router';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {CalendarProvider, LocaleConfig} from 'react-native-calendars';
import {CalendarProvider as CalendarCustomProvider} from './src/contexts/CalendarContext';
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul.',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <CalendarProvider date={'2024-07-19'}>
        <CalendarCustomProvider>
          <Router />
        </CalendarCustomProvider>
      </CalendarProvider>
    </ApplicationProvider>
  );
};

export default App;
