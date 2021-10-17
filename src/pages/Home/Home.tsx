/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

import { Resume } from './Home.styled';
import Graph from '../../components/Graphs/Graphs';
// import TopProblem from '../../components/TopProblems/TopProblems';

const Home: React.FC = () => {
  return (
    <>
      <Resume>
        <Graph />
        {/* <TopProblem /> */}
        {/* <iframe
          src="http://camposdojordao.sp.gov.br/transparencia/"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          width="400"
          height="400"
          title="portal"
          is="x-frame-bypass"
        /> */}
      </Resume>
    </>
  );
};

export default Home;
