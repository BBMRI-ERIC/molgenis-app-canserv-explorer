// import utils from '../../utils' - commented, only used in GetBiobankReport ${utils.qualityAttributeSelector('bio')} below
import api from '@molgenis/molgenis-api-client'
import { encodeRsqlValue, transformToRSQL } from '@molgenis/rsql'
import { COLLECTION_ATTRIBUTE_SELECTOR } from '../actions'

export const BIOBANK_API_PATH = '/api/v2/canserv_service_providers'

export const biobankActions = {
  QueryBiobanks ({ state, commit, getters }) {
    console.log('QueryBiobanks-1')
    commit('SetBiobankIds', undefined)
    console.log('QueryBiobanks-2')
    let size = state.pageSize

    if (getters.biobankRsql) {
      size = 10000
    }
    console.log('QueryBiobanks-3')
    let url = `/api/data/canserv_service_providers?filter=id&page=${state.currentPage - 1}&size=${size}&sort=name`
    if (getters.biobankRsql) {
      console.log('QueryBiobanks-4')
      url = `${url}&q=${encodeRsqlValue(getters.biobankRsql)}`
      console.log('QueryBiobanks-4.1', url)
    }
    console.log('QueryBiobanks-5')
    api.get(url)
      .then(response => {
        commit('SetBiobankIds', response.items.map(item => item.data.id))
        commit('SetBiobankCount', response)
      }, error => {
        commit('SetError', error)
      })
  },
  /*
   * Retrieves biobanks and stores them in the cache
   */
  GetBiobanks ({ commit }, biobankIds) {
    console.log('GetBiobanks-1')
    console.log('biobankIds', biobankIds)
    const q = encodeRsqlValue(transformToRSQL({ selector: 'id', comparison: '=in=', arguments: biobankIds }))
    api.get(`${BIOBANK_API_PATH}?num=1000&attrs=${COLLECTION_ATTRIBUTE_SELECTOR},*&q=${q}`)
      .then(response => {
        console.log('GetBiobanks-commit', response.items)
        commit('SetBiobanks', response.items)
      }, error => {
        console.log('GetBiobanks-error')
        commit('SetError', error)
      })
  },
  GetBiobankReport ({ commit, state }, biobankId) {
    if (state.allBiobanks) {
      commit('SetBiobankReport', state.allBiobanks.find(it => it.id === biobankId))
      return
    }
    commit('SetLoading', true)
    // api.get(`${BIOBANK_API_PATH}/${biobankId}?attrs=${COLLECTION_ATTRIBUTE_SELECTOR},${utils.qualityAttributeSelector('bio')},contact(*),head(first_name,last_name,role),*`).then(response => {
    api.get(`${BIOBANK_API_PATH}/${biobankId}?attrs=${COLLECTION_ATTRIBUTE_SELECTOR},*`).then(response => {
      commit('SetBiobankReport', response)
      commit('SetLoading', false)
    }, error => {
      commit('SetError', error)
      commit('SetLoading', false)
    })
  }
}
