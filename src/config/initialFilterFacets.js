const filterDefinitions = [
/*   {
    component: 'MultiFilter',
    name: 'diagnosis_available',
    label: 'Diagnosis available',
    maxVisibleOptions: 100,
    tableName: 'eu_bbmri_eric_disease_types',
    columnName: 'diagnosis_available',
    humanReadableString: 'Disease type(s):',
    showFacet: true
  },
  */
  {
    name: 'field',
    label: 'Service Field',
    tableName: 'canserv_service_fields',
    columnName: 'service_field',
    humanReadableString: 'Service field(s):',
    applyTo: ['canserv_services'],
    removeOptions: ['other'],
    showFacet: true,
    adaptive: true
  },
  {
    name: 'category',
    label: 'Service category',
    tableName: 'canserv_service_categories',
    columnName: 'category',
    humanReadableString: 'Service categories:',
    applyTo: ['canserv_services', 'eu_bbmri_eric_collections', 'eu_bbmri_eric_biobanks'],
    showFacet: true,
    adaptive: true
  },
  {
    name: 'type',
    label: 'Service type',
    tableName: 'canserv_service_types',
    columnName: 'type',
    humanReadableString: 'Service type(s):',
    applyTo: ['canserv_services', 'eu_bbmri_eric_collections', 'eu_bbmri_eric_biobanks'],
    removeOptions: ['other'],
    showFacet: true,
    adaptive: true
  },
  {
    name: 'country',
    label: 'Countries',
    tableName: 'eu_bbmri_eric_countries',
    columnName: 'country',
    humanReadableString: 'Countries:',
    queryOptions: '?sort=name',
    applyTo: ['canserv_services'],
    showFacet: true,
    adaptive: true
  },
  /* will stay removed:
  {
    name: 'biobank_capabilities',
    label: 'Services',
    tableName: 'eu_bbmri_eric_capabilities',
    columnName: 'capabilities',
    humanReadableString: 'Services:',
    applyTo: ['eu_bbmri_eric_biobanks'],
    showFacet: false
  },
  {
    name: 'combined_quality',
    label: 'Quality labels',
    tableName: 'eu_bbmri_eric_assessment_levels',
    columnName: 'combined_quality',
    humanReadableString: 'Quality label(s):',
    showFacet: false
  },
  {
    name: 'network',
    label: 'Network',
    tableName: 'eu_bbmri_eric_networks',
    columnName: 'combined_network',
    humanReadableString: 'Network(s):',
    showFacet: false
  },
  {
    name: 'dataType',
    label: 'Data type',
    tableName: 'eu_bbmri_eric_data_types',
    columnName: 'data_categories',
    humanReadableString: 'Data type(s):',
    removeOptions: ['other'],
    showFacet: false
  },
  */
  {
    name: 'search',
    label: 'Search',
    humanReadableString: 'Text search is',
    builtIn: true // search should not be generated
  }
]

module.exports = filterDefinitions
