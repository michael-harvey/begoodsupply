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

  return (
    <div className="container">
      <Head>
        <title>Begoodsupply</title>
      </Head>

      <header className="header">
        <img className="header__logo" src="/logo.png" alt="begoodsupply logo" />
      </header>

      <main className="content">
        <h1 className="type--light">Where does my waste go?</h1>

        <div className="field">
          {/* region */}
          {/* <label htmlFor="region" className="field__label">
            Which region do you live in?
          </label> */}

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
        </div>

        <div className="field">
          {/* council */}
          {/* <label htmlFor="council" className="field__label">
            Which council do you belong to?
          </label> */}

          <select
            id="council"
            name="council"
            onChange={(e) => setCouncilId(e.target.value)}
            disabled={!regionCouncils.length || !regionId}
          >
            <option value="">Select a Council</option>
            {regionCouncils.length &&
              regionCouncils.map((council) => (
                <option key={council.id} value={council.id}>
                  {council.name}
                </option>
              ))}
          </select>
        </div>

        <div className="field">
          {/* type */}
          {/* <label htmlFor="type" className="field__label">
            What type of waste are you disposing?
          </label> */}

          <select
            id="type"
            name="type"
            onChange={(e) => setTypeId(e.target.value)}
            disabled={!councilTypes.length || !councilId}
          >
            <option value="">Select a Type</option>
            {councilTypes.length &&
              councilTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>
        </div>

        {/* selectedType */}
        {typeId && selectedType && (
          <div>
            <h3>{selectedType.name}</h3>
            <p>{selectedType.value}</p>
          </div>
        )}
      </main>

      <footer></footer>
    </div>
  );
}
