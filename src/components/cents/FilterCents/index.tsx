'use client';

import { useEffect, useState } from 'react';
import { getAllGame } from './ultil/api';

export function FilterCents(): JSX.Element {
  const [dataGame, setDataGame] = useState([]);

  useEffect(() => {
    async function fetchDataGamePOint() {
      const game = await getAllGame();
      console.log('🚀 ~ fetchDataGamePOint ~ game:', game);
    }

    fetchDataGamePOint();
  }, []);

  return <div></div>;
}
