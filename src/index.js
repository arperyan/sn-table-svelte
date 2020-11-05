import {
  useElement,
  useLayout,
  useEffect
} from '@nebula.js/stardust';

import properties from './object-properties';
import data from './data';
// import "../dist/svelte-component.css"

// import { render, teardown } from './components/root';
import {
  render,
  destroySvelte
} from "./components/main.js"


export default function supernova( /* env */ ) {
  return {
    qae: {
      properties,
      data,
    },
    component() {
      const element = useElement();
      const layout = useLayout();

      useEffect(
        () => () => {
          console.log('hi')
          destroySvelte();
        },
        []
      );

      render(element, {
        layout
      })


    },
  };
}
