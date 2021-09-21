import React from 'react';

import { TopProblems } from '../../pages/Home/Home.styled';

const TopProblem: React.FC = () => {
  return (
    <TopProblems>
      <div>
        <h1>top municipios problemas</h1>
      </div>
      <div>
        <h1>Chamados abertos</h1>
      </div>
    </TopProblems>
  );
};

export default TopProblem;
