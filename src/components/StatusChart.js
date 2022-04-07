import React, { useState, useEffect } from "react";
import { SITE_DETAIL } from "../graphql/apollo";
import { useQuery } from "@apollo/client";
import Chart from "react-apexcharts";
import _ from "lodash";

const StatusChart = ({ site }) => {
  const [siteResult, setSiteResult] = useState([]);

  const { data } = useQuery(SITE_DETAIL, {skip: !site, variables: { site }});

  useEffect(() => {
    if (data){
      setSiteResult(data.launches);
    }
  }, [data]);

  const groupedYearsData = _.chain(siteResult)
    .groupBy("launch_year")
    .map((value, key) => ({ year: key, data: value }))
    .value();

  let yearlyData = {};
  groupedYearsData.forEach(function (row) {
    yearlyData[row.year] = {};
    let isSuccess = 0;
    let isFailed = 0;
    row.data.forEach(function (data) {
      if (data.launch_success) {
        isSuccess += 1;
      } else {
        isFailed += 1;
      }
      yearlyData[row.year].isSuccess = isSuccess;
      yearlyData[row.year].isFailed = isFailed;
    });
  });

  const config = {
    options: {
      colors: ["#5BD487", "#E6335B"],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 15,
          forceBorderRadius: 11,
          columnWidth: "60%",
          colors: {
            backgroundBarColors: ["#EFF1FA"],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 11,
          },
        },
      },
      chart: {
        id: "basic-bar",
        animations: { enabled: false },
      },
      xaxis: {
        categories: Object.keys(yearlyData).map((key) => [Number(key)]),
      },
    },
    series: [
      {
        name: "Successful",
        data: Object.keys(yearlyData).map((key) => yearlyData[key].isSuccess),
      },
      {
        name: "Failed",
        data: Object.keys(yearlyData).map((key) => yearlyData[key].isFailed),
      },
    ],
  };

  return (
    <div>
      <br />
      <br />
      <Chart
        type="bar"
        options={config.options}
        series={config.series}
        height={250}
        width={600}
      />
    </div>
  );
};

export default StatusChart;
