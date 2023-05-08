const initialBiobankColumns = [
  { label: 'Id:', column: 'id', type: 'string', showCopyIcon: true },
  { label: 'Description:', column: 'description', type: 'longtext' },
  { label: 'Juridical person:', column: 'juridical_person', type: 'string', showOnBiobankCard: true }
]

module.exports = initialBiobankColumns
