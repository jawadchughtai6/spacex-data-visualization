import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import { LAUNCH_SITES } from "../graphql/apollo";
import { useQuery } from "@apollo/client";

import StatusChart from "./StatusChart";
import PieChart from "./PieChart";

function VizualizationPage() {
  const { data, loading } = useQuery(LAUNCH_SITES);
  const [uniqueSites, setUniqueSites] = useState();
  const [selectedSite, setSelectedSite] = useState();

  const onDropdownValueChanged = (value) => {
    setSelectedSite(value);
  };

  useEffect(() => {
    let uniqueSitesSet = new Set(
      data?.launches?.map((item) => item.launch_site.site_name)
    );
    setUniqueSites(Array.from(uniqueSitesSet));
  }, [data]);

  return (
    <div className="visualization-main">
      <h1>Data Visualization</h1>
      <Dropdown values={uniqueSites} onValueChanged={onDropdownValueChanged} />
      <div className="vizualization">
        <StatusChart site={selectedSite} />
        <PieChart site={selectedSite} />
      </div>
    </div>
  );
}

export default VizualizationPage;
