import React from 'react';
import { Product } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LineChart } from '@mui/x-charts';
import { Skeleton, Box, Stack, Paper, Typography } from '@mui/material';
import { blue, blueGrey } from '@mui/material/colors';

type SalesChartProps = {
  product: Product | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: Boolean;
};

const SalesChart = ({ product, error, isLoading }: SalesChartProps) => {
  const data = product?.sales.map((sale, index) => {
    return {
      x: index,
      y: sale.retailSales,
      y2: Number(sale.unitsSold)
    };
  });

  const getMonthsFromDateStrings = (
    dateStrings: string[] | undefined
  ): string[] => {
    if (!dateStrings) return [];
    return dateStrings.map((str) => {
      const date = new Date(str);
      return date.toLocaleString('en-us', { month: 'short' }).toUpperCase();
    });
  };

  const dateStrings = product?.sales.map((saleCount) => saleCount.weekEnding);
  console.log(dateStrings);

  const months = getMonthsFromDateStrings(dateStrings);
  console.log(months);

  return (
    <>
      {error ? (
        'Product Not Found'
      ) : isLoading ? (
        <Skeleton>...Loading</Skeleton>
      ) : product ? (
        <Paper sx={{ height: '70%', width: '80%' }}>
          <Stack sx={{ height: '100%', width: '100%', padding: 2 }}>
            <Typography variant="h6">Retail Sales</Typography>
            <LineChart
              dataset={data}
              xAxis={[
                {
                  dataKey: 'x',
                  tickLabelInterval: (_value, index) => index % 2 === 0,
                  disableTicks: true,
                  valueFormatter: (value) => months[value]
                }
              ]}
              yAxis={[
                {
                  id: 'revenue',
                  dataKey: 'y',
                  scaleType: 'linear',
                  min: 0,
                  max: 3000000,
                  valueFormatter: (_value) => '',
                  disableTicks: true,
                  disableLine: true
                },
                {
                  id: 'unitsSold',
                  dataKey: 'y',
                  min: 0,
                  max: 10000
                }
              ]}
              series={[
                {
                  curve: 'catmullRom',
                  data: data?.map((data) => data.y),
                  color: blue[400],
                  showMark: false,
                  yAxisKey: 'revenue'
                },
                {
                  // curve: 'natural',
                  data: data?.map((data) => data.y2),
                  color: blueGrey[300],
                  yAxisKey: 'unitsSold',
                  showMark: false
                }
              ]}
              sx={{
                '& .MuiLineElement-root': {
                  strokeWidth: 4
                }
              }}
              margin={{ left: 80, right: 80 }}
            />
          </Stack>
        </Paper>
      ) : null}
    </>
  );
};

export default SalesChart;
