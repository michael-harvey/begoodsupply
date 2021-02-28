import Head from 'next/head';
import { useState, useEffect } from 'react';

import regions from '../data/regions';
import councils from '../data/councils';
import types from '../data/types';

export default function Home() {
  const [regionId, setRegionId] = useState(null);
  const [councilId, setCouncilId] = useState(null);
  const [typeId, setTypeId] = useState(null);
  const [regionCouncils, setRegionCounsils] = useState([]);
  const [councilTypes, setCouncilTypes] = useState([]);
  const [selectedType, setselectedType] = useState(null);

  // filter councils dropdown to those within selected region
  useEffect(() => {
    if (!regionId) {
      return;
    }
    setRegionCounsils(
      councils.filter((council) => council.regionId == regionId)
    );
  }, [regionId]);

  // filter types dropdown to those within selected council
  useEffect(() => {
    if (!councilId) {
      return;
    }

    setCouncilTypes(types.filter((type) => type.councilId == councilId));
  }, [councilId]);

  useEffect(() => {
    if (!typeId) {
      return;
    }

    setselectedType(types.filter((type) => type.id == typeId)[0]);
  }, [typeId]);

  console.log(selectedType);

  return (
    <div>
      <Head>
        <title>Begoodsupply</title>
      </Head>

      <main>
        <h1>
          regionId: {regionId}
          <br />
          councilId: {councilId}
          <br />
          typeId: {typeId}
        </h1>
        <div>
          <label htmlFor="region">Region</label>

          {/* region */}
          <select
            id="region"
            name="region"
            onChange={(e) => setRegionId(e.target.value)}
          >
            <option value="">Select a Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>

          {/* council */}
          <label htmlFor="council">Council</label>

          <select
            id="council"
            name="council"
            onChange={(e) => setCouncilId(e.target.value)}
            disabled={!regionCouncils.length}
          >
            <option value="">Select a Council</option>
            {regionCouncils.length &&
              regionCouncils.map((council) => (
                <option key={council.id} value={council.id}>
                  {council.name}
                </option>
              ))}
          </select>

          {/* type */}
          <label htmlFor="type">Reclycling type</label>

          <select
            id="type"
            name="type"
            onChange={(e) => setTypeId(e.target.value)}
            disabled={!councilTypes.length}
          >
            <option value="">Select a type</option>
            {councilTypes.length &&
              councilTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>

          {/* selectedType */}
          {selectedType && (
            <div>
              <h3>{selectedType.name}</h3>
              <p>{selectedType.value}</p>
            </div>
          )}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
