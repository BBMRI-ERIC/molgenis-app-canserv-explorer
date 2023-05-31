const initialCollectionColumns = [
  { label: 'Id:', column: 'id', type: 'string', showCopyIcon: true },
  { label: 'Website:', column: 'url', type: 'hyperlink' },
  { label: 'Acronym:', column: 'acronym', type: 'string', showOnBiobankCard: true },
  { label: 'Description:', column: 'description', type: 'string', showOnBiobankCard: true },
  { label: 'Name:', column: 'name', type: 'string', showOnBiobankCard: false },
  { label: 'Unit of access:', column: 'unit_of_access', type: 'string', showOnBiobankCard: true }]

module.exports = initialCollectionColumns
