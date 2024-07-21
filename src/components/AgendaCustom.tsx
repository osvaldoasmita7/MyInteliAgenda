import React, {useContext} from 'react';
import {Image, ListRenderItemInfo, StyleSheet} from 'react-native';

import {Button, Card, Layout, List, Text} from '@ui-kitten/components';
import {EventInterface} from '../interfaces';
import {CalendarContext} from '../contexts/CalendarContext';
import moment from 'moment';

export const AgendaCustom = () => {
  const {events, setEvents} = useContext(CalendarContext);

  const renderItem = (
    info: ListRenderItemInfo<EventInterface>,
  ): React.ReactElement => (
    <Card style={styles.item} status="basic">
      <Text status="primary" category="h4" style={{textAlign: 'center'}}>
        {info?.item?.name}
      </Text>
      <Text
        category="h5"
        status="primary"
        style={{marginTop: 10, textAlign: 'left'}}>
        {info?.item?.type}
      </Text>
      <Text category="s1" style={{marginTop: 10}}>
        De{' '}
        {info.item?.dateStart
          ? moment(info.item?.dateStart).format('DD/MM/YYYY')
          : ''}{' '}
        a{' '}
        {info.item?.dateEnd
          ? moment(info.item?.dateEnd).format('DD/MM/YYYY')
          : ''}
      </Text>
      <Text style={{marginTop: 10}}>
        {info?.item?.allDay
          ? 'Todo el día'
          : `${info?.item?.timeStart}hrs a las ${info?.item?.timeEnd} hrs`}
      </Text>
      <Text style={{marginTop: 10}}>{info.item.description}</Text>
      <Button
        style={{marginTop: 10}}
        status="danger"
        onPress={() => {
          const _events = events;
          _events.splice(info?.index, 1);

          setEvents([..._events]);
        }}>
        Eliminar
      </Button>
    </Card>
  );
  return (
    <Layout style={styles.container}>
      <Text category="h2" style={{textAlign: 'center', marginVertical: 20}}>
        Eventos creados
      </Text>

      {!events.length ? (
        <>
          <Image
            source={require('../assets/img/agenda.jpg')}
            style={styles.tinyLogo}
          />

          <Text category="h5" style={{textAlign: 'center', marginTop: 30}}>
            No hay eventos aún registrados
          </Text>
        </>
      ) : (
        <></>
      )}
      <List
        contentContainerStyle={styles.contentContainer}
        data={events}
        renderItem={lista => renderItem(lista)}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 0,
  },
  tinyLogo: {
    width: 280,
    height: 280,
    alignSelf: 'center',
  },
});
