<template>
  <div class="border-bottom p-3">
    <div v-if="!loading && foundBiobanks > 0">
      {{debug("foundBiobanks1")}}
      {{debug("foundBiobanks1", foundBiobanks)}}
      <div class="d-flex mb-4 justify-content-between">
        <result-header v-if="!loading" class="w-25" />

        <pagination class="align-self-center" />
        <!-- Alignment block -->
        <div class="w-25"></div>
      </div>
      {{debug("foundBiobanks2")}}
      {{debug("foundBiobanks2", foundBiobanks)}}

      <div
        class="d-flex justify-content-center flex-wrap biobank-cards-container">
        {{debug("biobank-card biobanksShown-1")}}
        {{debug("biobank-card biobanksShown-1", JSON.stringify(biobanksShown))}}
        {{debug("biobank-card biobanksShown-2", biobanksShown.length)}}
        {{debug("biobank-card biobanksShown-2")}}
        <div v-for="biobank in biobanksShown" :key="biobank.id || biobank">
          <ul>
            {{ debug("biobank-card loop biobanksShown 1") }}
            {{ debug("biobank-card loop biobanksShown 1.1", biobank) }}
            {{ debug("biobank-card loop biobanksShown 2") }}
            {{ debug("biobank-card loop biobanksShown 2.1", JSON.stringify(biobank)) }}
            {{ debug("biobank-card loop biobanksShown 2.2", biobank.id) }}
            {{ debug("biobank-card loop biobanksShown 2.3", biobank.name) }}
            {{ debug("biobank-card loop biobanksShown 3") }}
          </ul>
        </div>
        <biobank-card v-for="biobank in biobanksShown"
          :key="biobank.id || biobank"
          :biobank="biobank"
          :fullSize="biobanksShown.length === 1">        </biobank-card>
      </div>
      <pagination class="mt-4" />
    </div>
    <div v-else-if="!loading && foundBiobanks === 0" class="status-text">
      <h4>No service providers were found</h4>
    </div>

    <div v-else class="status-text">
      <h4>
        Loading data...
        <i class="fa fa-spinner fa-pulse" aria-hidden="true"></i>
      </h4>
    </div>
  </div>
</template>

<script>
import BiobankCard from './cards/BiobankCard.vue'
import Pagination from './buttons/Pagination.vue'
import ResultHeader from './ResultHeader.vue'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'biobank-cards-container',
  components: {
    BiobankCard,
    Pagination,
    ResultHeader
  },
  methods: {
    debug (...args) {
      console.log(...args)
    },
    ...mapActions(['GetBiobanks', 'QueryBiobanks'])
  },
  computed: {
    ...mapState(['pageSize', 'currentPage']),
    ...mapGetters([
      'biobanks',
      'foundBiobanks',
      'loading',
      'biobankRsql',
      'rsql'
    ]),
    biobanksShown () {
      console.log('biobanksShown-1')
      if (this.loading) return []
      // TODO check biobankRsql and rsql
      console.log('biobanksShown-2')

      console.log('biobanksShown-2.1', this.biobankRsql)
      console.log('biobanksShown-2.2', this.rsql)

      if (this.biobankRsql || this.rsql) {
        console.log('biobanksShown-3')
        return this.biobanks.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        )
      } else {
        console.log('biobanksShown-4')
        return this.biobanks
      }
    },
    biobankIdsToFetch () {
      return this.biobanksShown.filter(it => typeof it === 'string')
    }
  },
  watch: {
    currentPage () {
      console.log('watch-currentPage-biobanksRsql-rsql-1')
      if (!this.biobankRsql && !this.rsql) {
        console.log('watch-currentPage-biobanksRsql-rsql-2')
        this.QueryBiobanks()
      }
      console.log('watch-currentPage-biobanksRsql-rsql-3')
    },
    biobankIdsToFetch (value) {
      console.log('watch-biobankIdsToFetch-1')
      console.log(value)
      if (value.length) {
        console.log('watch-biobankIdsToFetch-2')
        this.GetBiobanks(value)
      }
      console.log('watch-biobankIdsToFetch-3')
    }
  }
}
</script>

<style>
.biobank-cards-container {
  gap: 2rem;
}

.status-text {
  text-align: center;
  justify-content: center;
  padding: 1rem;
}
</style>
