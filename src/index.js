import App from './App'

const SmartHome = new App(document.body);;

async function initialize() {
  await SmartHome.store.loadData();
  SmartHome.render();
}

initialize();