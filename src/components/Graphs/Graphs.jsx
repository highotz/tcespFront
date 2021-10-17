/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../../api';
import headers from '../../utils/getHeaders';

import { Graphs } from './Graph.styled';

const Graph = () => {
  const [graphStatusData, setGraphStatusData] = useState({});

  const handleData = async () => {
    const response = await api.get('/tickets', headers);
    // console.log(response.data);

    const arrToInstanceCountObj = (arr) =>
      arr.reduce((obj, e) => {
        obj[e] = (obj[e] || 0) + 1;
        return obj;
      }, {});

    const dataCitys = [...new Set(response.data.map((value) => value.city_id))];
    // console.log('id_citys', dataCitys);

    const citysStatusPending = dataCitys.map(
      (city) =>
        arrToInstanceCountObj(
          response.data
            .filter(
              (value) => value.status === 'pending' && value.city_id === city,
            )
            .map((value) => value.status),
        ).pending,
    );
    const citysStatusDone = dataCitys.map(
      (city) =>
        arrToInstanceCountObj(
          response.data
            .filter(
              (value) => value.status === 'done' && value.city_id === city,
            )
            .map((value) => value.status),
        ).done,
    );

    // Pega todos os ids dos tickets
    const IdsTickets = response.data.map((value) => value.id);

    // com os id unicos pegamos os nomes dos respectivos ids
    const itensById = await Promise.all(
      IdsTickets.map(
        async (value) =>
          (
            await api.get(`/tickets/items/${value}`, headers)
          ).data,
      ),
    );

    const namesCitys = await Promise.all(
      dataCitys.map(
        async (value) => (await api.get(`/citys/${value}`, headers)).data.name,
      ),
    );

    let itenPendingInfos = [];
    response.data.forEach((element, index) => {
      itenPendingInfos = [
        ...itenPendingInfos,
        {
          id: element.id,
          city_id: element.city_id,
          item: arrToInstanceCountObj(
            itensById[index].map((value) => value.status),
          ).pending,
        },
      ];
    });
    const itensPendingFiltered = itenPendingInfos
      .filter((value) => value.item)
      .map((value2) => {
        return {
          nameCity: namesCitys[dataCitys.indexOf(value2.city_id)],
          itens: value2.item,
        };
      });

    const itensPendingByCity = namesCitys.map((name) => {
      return itensPendingFiltered.reduce((acumulador, proxValor) => {
        if (acumulador.nameCity === name) {
          return (acumulador.itens += proxValor.itens);
        }
        return proxValor.itens;
      }, 0);
    });
    // console.log('itensById', itensById);

    // console.log('itensPendingFiltered', itensPendingFiltered);
    // console.log('itenPendingInfos');
    // console.log(namesCitys);
    // console.log(citysStatusDone);
    // console.log(citysStatusPending);
    // console.log(itensPendingByCity);
    setGraphStatusData({
      namesCitys,
      citysStatusDone,
      citysStatusPending,
      itensPendingByCity,
    });
  };

  useEffect(() => {
    handleData();
  }, []);

  const state = {
    labels: graphStatusData.namesCitys,
    datasets: [
      {
        label: 'Concluidas',
        backgroundColor: 'rgba(6, 214, 160,1)',
        borderColor: 'none',
        borderWidth: 0,
        data: graphStatusData.citysStatusDone,
        borderRadius: 2,
      },

      {
        label: 'Pendentes',
        data: graphStatusData.citysStatusPending,
        backgroundColor: 'rgba(239, 71, 111, 1)',
        borderColor: 'none',
        borderWidth: 0,
        borderRadius: 2,
      },
    ],
  };

  const stateGraph2 = {
    labels: graphStatusData.namesCitys,
    datasets: [
      {
        label: 'Itens com problemas',
        backgroundColor: 'rgba(239, 71, 111, 1)',
        borderColor: 'none',
        borderWidth: 0,
        data: graphStatusData.itensPendingByCity,
        borderRadius: 2,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            family: 'Now',
          },
        },
      },
      // drawTicks: false,
    },
    plugins: {
      title: {
        text: 'Status das auditorias dos municípios',
        display: true,
        font: {
          size: 22,
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Now',
          },
        },
      },
    },
  };
  return (
    <Graphs>
      <div>
        <Bar
          id="1"
          data={state}
          options={options}
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </div>
      <div>
        <Bar
          id="1"
          data={stateGraph2}
          options={{
            ...options,
            plugins: {
              title: {
                text: 'Municípios com mais problemas encontrados',
                display: true,
                font: {
                  size: 22,
                },
              },
              legend: {
                position: 'bottom',
                labels: {
                  font: {
                    family: 'Now',
                  },
                },
              },
            },
          }}
          style={{
            width: '80%',
            height: '80%',
          }}
        />
      </div>
    </Graphs>
  );
};

export default Graph;
