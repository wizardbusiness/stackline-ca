import React, { useState } from 'react';
import { Product } from '../types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { LineChart } from '@mui/x-charts';
import { Stack, Box, Typography } from '@mui/material';
import { blue, grey, blueGrey } from '@mui/material/colors';

type SalesChartProps = {
  product: Product | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: Boolean;
};

const SalesChart = ({ product, error, isLoading }: SalesChartProps) => {
  console.log(!!isLoading);
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

  const months = getMonthsFromDateStrings(dateStrings);

  return (
    <>
      {error ? (
        'Product Not Found'
      ) : product ? (
        <Box
          sx={{
            height: '60%',
            width: '80%',
            backgroundColor: 'white',
            paddingBottom: '1em'
          }}
        >
          <Stack sx={{ height: '100%', width: '100%', padding: 2 }}>
            <Typography color={blueGrey[600]} variant="h6">
              Retail Sales
            </Typography>
            <LineChart
              loading={!!isLoading}
              dataset={data}
              xAxis={[
                {
                  dataKey: 'x',
                  tickLabelInterval: (_value, index) => index % 2 === 0,
                  disableTicks: true,
                  valueFormatter: (value) => months[value],
                  tickLabelStyle: {
                    fontSize: '0.9em',
                    transform: 'translateY(20px) translateX(20px)',
                    fill: grey[500]
                  }
                }
              ]}
              yAxis={[
                {
                  id: 'revenue',
                  dataKey: 'y',
                  scaleType: 'linear',
                  min: -50000,
                  max: 3000000,
                  valueFormatter: (_value) => '',
                  disableTicks: true,
                  disableLine: true
                },
                {
                  id: 'unitsSold',
                  dataKey: 'y',
                  min: -100,
                  max: 10000
                }
              ]}
              series={[
                {
                  curve: 'natural',
                  data: data?.map((data) => data.y),
                  color: blue[400],
                  showMark: false,
                  yAxisKey: 'revenue'
                },
                {
                  curve: 'natural',
                  data: data?.map((data) => data.y2),
                  color: 'gray',
                  yAxisKey: 'unitsSold',
                  showMark: false
                }
              ]}
              sx={{
                '& .MuiLineElement-root': {
                  strokeWidth: 4
                },
                '& .MuiChartsAxis-line': {
                  stroke: grey[100]
                }
              }}
              margin={{ left: 20, right: 80, bottom: 70 }}
            />
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

export default SalesChart;
