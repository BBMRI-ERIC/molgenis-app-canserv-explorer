
/* import { fixCollectionTree } from '../helpers' */

export const biobankMutations = {
  SetBiobanks (state, biobanks) {
    console.log('SetBiobanks', biobanks)
    const biobankLookup = {}

    biobanks.forEach(biobank => {
    /* biobankLookup[biobank.id] = fixCollectionTree(biobank) */
      console.log('SetBiobanks-1', biobank.id)
      biobankLookup[biobank.id] = biobank
      console.log('SetBiobanks-2', biobankLookup[biobank.id], biobank)
    })
    console.log('SetBiobanks-3', biobankLookup)
    state.biobanks = { ...state.biobanks, ...biobankLookup }

    /*    state.biobanks = biobanks */
  },
  SetBiobankIds (state, biobankIds) {
    state.biobankIds = biobankIds
  },
  /**
   * Store a single biobank in the state for showing a biobank report
   * @param state
   * @param biobank response object from the server containing meta and items for a single biobank
   */
  SetBiobankReport (state, biobank) {
    state.biobankReport = biobank
  },
  SetBiobankCount (state, response) {
    /* Need to keep track of initial amount, because not all biobanks have collections */
    if (!state.initialBiobankCount) {
      state.initialBiobankCount = response.page.totalElements
      state.initialBiobankIds = response.items.map(item => item.data.id)
    }
    state.biobankCount = response.page.totalElements
  },
  CalculateBiobankCount (state, getters) {
    if (getters.biobankRsql && !getters.rsql) {
      // calculation has already been done.
    } else if (getters.rsql) {
      state.biobankCount = [...new Set(state.collectionInfo.map(collection => collection.biobankId))].length
    } else {
      state.biobankCount = state.initialBiobankCount
    }
  }
}
