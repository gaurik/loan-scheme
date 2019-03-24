// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux';
// import {
//   BrowserRouter,
// } from 'react-router-dom';

// import store from './infrastructure/store';

// it('rendimport store from', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(
//     <Provider store={store}>
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// </Provider>, div);
//   ReactDOM.unmountComponentAtNode(div);
// });



import React from 'react';
import App from './App';
import store from './infrastructure/store';
import { Provider } from 'react-redux';
import Enzyme,{ mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Unit testing for App Component
 */
describe('App Component should', () => {

      it('be created without crash', () => {
        const component = mount(<Provider store={store}>
          <BrowserRouter>
            < App />
          </BrowserRouter>
        </Provider>);
        expect(component.find(App).length).toBe(1);
      });
});