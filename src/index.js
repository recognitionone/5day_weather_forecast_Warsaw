import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import weatherStore from './stores/WeatherStore';
import { Provider } from 'mobx-react';


const Root = (
	<Provider weatherStore={weatherStore}>
		<App />
	</Provider>
	)



ReactDOM.render(Root, document.getElementById('root'));

serviceWorker.unregister();
