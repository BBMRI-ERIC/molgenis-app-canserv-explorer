const initialBiobankColumns = [
  { label: 'Id:', column: 'id', type: 'string', showCopyIcon: true },
  { label: 'Description:', column: 'description', type: 'longtext', showOnBiobankCard: true },
  { label: 'Name of Institute:', column: 'name_of_institue', type: 'string', showOnBiobankCard: true },
  { label: 'Acronym:', column: 'acronym', type: 'string', showOnBiobankCard: true },
  { label: 'URL:', column: 'url', type: 'hyperlink', showOnBiobankCard: true },
  // { label: 'Juridical person:', column: 'juridical_person', type: 'string', showOnBiobankCard: true },
  { label: 'Country:', column: 'country', type: 'string', showOnBiobankCard: true },
  { label: 'Timezone:', column: 'timezone', type: 'string', showOnBiobankCard: true }
]

module.exports = initialBiobankColumns
