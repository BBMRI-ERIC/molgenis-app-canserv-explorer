import api from '@molgenis/molgenis-api-client'
import { encodeRsqlValue } from '@molgenis/rsql'
import { COLLECTION_API_PATH } from '../actions'
/**/
import initialCollectionColumns from '../../config/initialCollectionColumns'

export const COLLECTION_REPORT_ATTRIBUTE_SELECTOR = () => {
  console.log('COLLECTION_REPORT_ATTRIBUTE_SELECTOR-1')
  const collectionRsql = initialCollectionColumns.filter(icc => icc.rsql).map(prop => prop.rsql)

  console.log('COLLECTION_REPORT_ATTRIBUTE_SELECTOR-1.1', collectionRsql)
  let rsqlStart = '*,'

  console.log('COLLECTION_REPORT_ATTRIBUTE_SELECTOR-2')
  if (collectionRsql.length) {
    console.log('COLLECTION_REPORT_ATTRIBUTE_SELECTOR-2.1')
    rsqlStart += collectionRsql.join(',')
  }
  console.log('COLLECTION_REPORT_ATTRIBUTE_SELECTOR-3', `${rsqlStart},service_provider(id,name,name_of_institue,acronym,timezone,juridical_person,country,description,url))`)
  // return `${rsqlStart},service_provider(id,name,juridical_person,country,url,contact),head(first_name,last_name,role),contact(title_before_name,first_name,last_name,title_after_name,email,phone),sub_collections(name,id,sub_collections(*),parent_collection,order_of_magnitude,materials(label,uri),data_categories)`
  return `${rsqlStart},service_field,service_provider(id,name,name_of_institue,acronym,timezone,juridical_person,country,description,url))`
}

export const collectionActions = {

  async initializeCollectionRelationData ({ commit }) {
    console.log('initializeCollectionRelationData')
    // biobank_label is a mapping in the collection table to the name column of biobank table
    /* const url = '/api/data/eu_bbmri_eric_collections?filter=id,biobank(id,name,label),name,label,collaboration_commercial,parent_collection&expand=biobank&size=10000&sort=biobank_label' */
    const url = '/api/data/canserv_services?filter=id,service_provider(id,name,label),name,label,description,service_field&size=10000&expand=service_provider'

    const response = await api.get(url).catch(error => commit('SetError', error))
    commit('SetAllCollectionRelationData', response)
  },
  /*
   * Retrieves all collection identifiers matching the collection filters, and their biobanks
   */
  async GetCollectionInfo ({ state, commit, getters, dispatch }) {
    // check if initial data is present, else fetch that first
    console.log('GetCollectionInfo')
    if (state.collectionRelationData.length === 0) {
      await dispatch('initializeCollectionRelationData')
    }

    commit('SetCollectionInfo', undefined)
    /* let url = '/api/data/eu_bbmri_eric_collections?filter=id&size=10000&sort=biobank_label&expand=materials,diagnosis_available' */
    let url = '/api/data/canserv_services?filter=id&size=10000'
    if (getters.rsql) {
      url = `${url}&q=${encodeRsqlValue(getters.rsql)}`
    }
    api.get(url)
      .then(response => {
        commit('SetCollectionInfo', response)
        commit('CalculateBiobankCount', getters)
      }, error => {
        commit('SetError', error)
      })
  },
  GetCollectionReport ({ commit }, collectionId) {
    console.log('GetCollectionReport-1')
    commit('SetLoading', true)
    console.log('GetCollectionReport-1.1', `${COLLECTION_API_PATH}/${collectionId}?attrs=${COLLECTION_REPORT_ATTRIBUTE_SELECTOR()},service_field`)
    api.get(`${COLLECTION_API_PATH}/${collectionId}?attrs=${COLLECTION_REPORT_ATTRIBUTE_SELECTOR()},service_field`).then(response => {
      console.log('GetCollectionReport-2')
      commit('SetCollectionReport', response)
      commit('SetLoading', false)
    }, error => {
      console.log('GetCollectionReport-3')
      commit('SetError', error)
      commit('SetLoading', false)
    })
    console.log('GetCollectionReport-4')
  },
  AddCollectionsToSelection ({ commit, getters }, { collections, bookmark }) {
    console.log('AddCollectionsToSelection')
    commit('SetCartValidationStatus', false)
    commit('SetCollectionsToSelection', { collections, bookmark })
    commit('SetSearchHistory', getters.getHumanReadableString)
  },
  GetPodiumCollections ({ state, commit }) {
    console.log('GetPodiumCollections')
    if (state.isPodium && state.podiumCollectionIds.length === 0) { // only fetch once.
      api.get("/api/data/eu_bbmri_eric_collections?num=10000&filter=id&q=podium!=''").then(response => {
        commit('SetPodiumCollections', response)
      })
    }
  }
}
