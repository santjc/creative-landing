import { createRef } from 'react';

const state = {
  sections: 3,
  pages: 1,
  zoom: 1,
  top: createRef<number>(),
};

export default state;
