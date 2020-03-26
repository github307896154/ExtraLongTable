import ExtraLongTable from './extra-long-table'
ExtraLongTable.install = Vue => Vue.component(ExtraLongTable.name, ExtraLongTable);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ExtraLongTable);
}

export default ExtraLongTable