import React, { useState, useEffect } from "react";
import { SITE_DETAIL } from "../graphql/apollo";
import { useQuery } from "@apollo/client";
import Chart from "react-apexcharts";
import _ from "lodash";

const PieChart = ({site}) => {

  const [siteResult, setSiteResult] = useState([]);
  const { data } = useQuery(SITE_DETAIL, {skip: !site, variables: { site }});

  useEffect(() => {
    if (data){
      setSiteResult(data.launches);
    }
  }, [data]);

  let rocketData = {}
    siteResult.forEach(function(row){
      if (row.rocket.rocket_name in rocketData){
          rocketData[row.rocket.rocket_name] += 1;
      } else {
          rocketData[row.rocket.rocket_name] = 0;
      }
  });

  const config = {
    options: {
      legend: {
        fontSize: "14px",
        fontFamily: "Poppins",
      },
      labels: Object.keys(rocketData),
      dataLabels: {
        enabled: false,
      },
      colors: ["#5BD487", "#E6335B", "#D1D1D1"],
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            size: "83%",
          },
        },
      },
    },
      series: Object.values(rocketData),
  };

    return (
        <div>
          <br />
          <br />
          <Chart options={config.options} series={config.series} type="donut" width="380" />
        </div>
    );
};

export default PieChart;