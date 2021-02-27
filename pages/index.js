import Head from 'next/head';
import { useState, useEffect } from 'react';

import regions from '../data/regions';
import councils from '../data/councils';
import types from '../data/types';

export default function Home() {
  const [regionId, setRegionId] = useState(null);
  const [councilId, setCouncilId] = useState(null);
  const [regionCouncils, setRegionCounsils] = useState([]);
  const [councilTypes, setCouncilTypes] = useState([]);

  useEffect(() => {
    setRegionCounsils(
      councils.filter((council) => council.regionId == regionId)
    );
  }, [regionId]);

  useEffect(() => {
    setCouncilTypes(types.filter((type) => type.councilId == councilId));
  }, [councilId]);

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
          {councilTypes.map((type) => (
            <p key={type.id}>
              {type.name}: {type.value}
            </p>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
