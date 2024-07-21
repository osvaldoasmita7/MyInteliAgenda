import React, {useContext, useState} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {CalendarContext} from '../contexts/CalendarContext';
import moment from 'moment';

import {
  Datepicker,
  Input,
  Layout,
  Select,
  SelectItem,
  Toggle,
  Button,
  Text,
} from '@ui-kitten/components';
import {ErrorsInterface, EventInterface} from '../interfaces';
import {FORM_STATE} from '../states/initialStates';
import {Times} from '../enums/form';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TitleDevelop} from '../components/TitleDevelop';

export const CreateScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const {types, events, setEvents} = useContext(CalendarContext);
  const [errorForm, setErrorForm] = useState<ErrorsInterface>({
    name: '',
    dateStart: '',
    type: '',
    dateEnd: '',
    timeEnd: '',
    timeStart: '',
  });
  const [error, setError] = useState<string[]>([]);
  const [form, setForm] = useState<EventInterface>(FORM_STATE);
  const [showTimes, setShowTimes] = useState({
    timeStart: false,
    timeEnd: false,
  });

  const showDatePicker = (name: string, value: boolean) => {
    setShowTimes(prev => ({...prev, [name]: value}));
  };

  const handleConfirm = (name: string, date: Date) => {
    setForm(prev => ({
      ...prev,
      [name]: moment(date).format('HH:mm'),
    }));
    showDatePicker(name, false);
  };
  const validate = () => {
    setErrorForm(prev => ({
      ...prev,
      dateStart: !dateStart ? 'La fecha de inicio es requerida' : '',
      name: !name ? 'El nombre del evento es requerido' : '',
      type: !type ? 'El tipo de evento es requerido' : '',
      dateEnd: !allDay && !dateEnd ? 'La fecha de fin es requerida' : '',
      timeEnd: !allDay && !timeEnd ? 'La hora de fin es requerida' : '',
      timeStart: !allDay && !timeStart ? 'La hora de inicio es requerida' : '',
    }));

    let flag = false;
    if (!dateStart) flag = true;
    if (!name) flag = true;
    if (!type) flag = true;
    if (!allDay) {
      if (!dateEnd) flag = true;
      if (!timeEnd) flag = true;
      if (!timeStart) flag = true;
    }
    return flag;
  };
  const submit = () => {
    if (validate()) return;
    setEvents(prev => [...prev, {...form, id: events.length + 1}]);
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  const {allDay, dateEnd, dateStart, name, type, timeEnd, timeStart} = form;

  return (
    <Layout style={{flex: 1, padding: 20}}>
      <TitleDevelop />
      <Layout>
        <Input
          label={'Nombre del evento*'}
          style={{marginTop: 20}}
          placeholder="Escribe el nombre del evento"
          onChange={value => {
            setForm(prev => ({...prev, name: value?.nativeEvent?.text}));
          }}
          value={name}
        />

        <Text status="danger">{errorForm.name}</Text>

        <Select
          label={'Tipo de evento'}
          value={type}
          style={{marginTop: 20}}
          placeholder={'Selecciona un evento'}
          onSelect={index => {
            setForm({...form, type: types[+index.toString() - 1]});
          }}>
          {types.map(x => (
            <SelectItem title={x} />
          ))}
        </Select>
        <Text status="danger">{errorForm.type}</Text>

        <Layout
          style={{
            flexDirection: 'row',
            marginTop: 20,
            flexWrap: 'wrap',
          }}>
          <Datepicker
            label={'Fecha de inicio'}
            date={dateStart}
            style={{width: '45%', marginRight: '10%'}}
            onSelect={nextDate =>
              setForm(prev => ({
                ...prev,
                dateStart: nextDate,
                dateEnd: allDay ? nextDate : prev.dateEnd,
              }))
            }
            max={form?.dateEnd || null}
          />
          <Text status="danger">{errorForm.dateStart}</Text>
          <Datepicker
            label={'Fecha de fin'}
            date={dateEnd}
            disabled={allDay}
            onSelect={nextDate =>
              setForm(form => ({...form, dateEnd: nextDate}))
            }
            style={{width: '45%'}}
            min={form?.dateStart || null}
          />
          <Text status="danger">{errorForm.dateEnd}</Text>
          {!allDay && (
            <>
              <Layout style={{width: '45%', marginRight: '10%', marginTop: 20}}>
                <Text category="c2">Hora de inicio</Text>
                <Button
                  appearance="outline"
                  onPress={() => {
                    showDatePicker(Times.start, true);
                  }}>
                  {timeStart || '00:00'}
                </Button>
                <Text status="danger">{errorForm.timeStart}</Text>
              </Layout>

              <Layout style={{width: '45%', marginTop: 20}}>
                <Text category="c2">Hora de fin</Text>
                <Button
                  appearance="outline"
                  onPress={() => {
                    showDatePicker(Times.end, true);
                  }}>
                  {timeEnd || '00:00'}
                </Button>
                <Text status="danger">{errorForm.timeEnd}</Text>
              </Layout>
            </>
          )}
        </Layout>

        <Toggle
          style={{alignSelf: 'flex-start', marginTop: 20, marginBottom: 20}}
          checked={allDay}
          onChange={(value: boolean) =>
            setForm(prev => ({
              ...prev,
              allDay: value,
              dateEnd: dateStart,
              timeEnd: '',
              timeStart: '',
            }))
          }>
          Todo el día
        </Toggle>

        <DateTimePickerModal
          isVisible={showTimes.timeStart}
          mode="time"
          onConfirm={value => handleConfirm(Times.start, value)}
          onCancel={() => showDatePicker(Times.start, false)}
        />
        <DateTimePickerModal
          isVisible={showTimes.timeEnd}
          mode="time"
          onConfirm={value => handleConfirm(Times.end, value)}
          onCancel={() => showDatePicker(Times.end, false)}
        />
        <Input
          label={'Descripción'}
          multiline={true}
          numberOfLines={5}
          placeholder="Escribe el nombre del evento"
          onChange={value => {
            setForm(prev => ({...prev, description: value?.nativeEvent?.text}));
          }}
        />
        <Layout>
          {error.map(x => (
            <Text status="danger" style={{marginTop: 10}}>
              {x}
            </Text>
          ))}
        </Layout>
        <Layout
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Button appearance="outline" style={{marginHorizontal: 10}}>
            Cancelar
          </Button>

          <Button
            appearance="filled"
            style={{marginHorizontal: 10}}
            onPress={submit}>
            Confirmar
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};
