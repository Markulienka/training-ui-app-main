import { Module } from "asab_webui_components";

import { TableScreen } from './TableScreen.jsx';
import {DetailScreen} from "./DetailScreen.jsx";

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule");

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Table',
			component: TableScreen,
		});

		// added new route
		app.Router.addRoute({
			path: "/detail/:id",
			end: true,
			name: 'Detail',
			component: DetailScreen,
		});

		app.Navigation.addItem({
			name: "Table",
			icon: 'bi bi-table',
			url: "/",
		});
	}
}
