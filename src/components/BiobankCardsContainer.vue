<template>
  <div class="border-bottom p-3">
    <div v-if="!loading && foundBiobanks > 0">
      {{debug("BiobankCardContainer-foundBiobanks1")}}
      {{debug("BiobankCardContainer-foundBiobanks1", foundBiobanks)}}
      <div class="d-flex mb-4 justify-content-between">
        <result-header v-if="!loading" class="w-25" />

        <!-- <pagination class="align-self-center" /> -->
        <!-- Alignment block -->
        <div class="w-25"></div>
      </div>
      {{debug("BiobankCardContainer-foundBiobanks2")}}
      {{debug("BiobankCardContainer-foundBiobanks2", foundBiobanks)}}

      <div
        class="d-flex justify-content-center flex-wrap biobank-cards-container">
        <!-- {{debug("BiobankCardContainer-biobank-card biobanksShown-1")}}
        {{debug("BiobankCardContainer-biobank-card biobanksShown-1", JSON.stringify(biobanksShown))}}
        {{debug("BiobankCardContainer-biobank-card biobanksShown-2", biobanksShown.length)}}
        {{debug("BiobankCardContainer-biobank-card biobanksShown-2")}}
        <div v-for="biobank in biobanksShown" :key="biobank.id || biobank">
          <ul>
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 1") }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 1.1", biobank) }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 2") }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 2.1", JSON.stringify(biobank)) }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 2.2", biobank.id) }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 2.3", biobank.name) }}
            {{ debug("BiobankCardContainer-biobank-card loop biobanksShown 3") }}
          </ul>
        </div>
        -->
        <!-- TODO: replace biobank-card v-for by table to show collections from biobanksShown
        replace :fields="" with non-existent value to get info what fields are available -->
        <!-- {{  biobanksShown }} -->
        <!-- information on custom rendering:
          https://bootstrap-vue.org/docs/components/table#custom-data-rendering -->
        <b-table small :fields="collectiontablefields" :items="createCollectionTable" responsive="sm">
          <template v-slot:cell(selected)="data">
            <!-- TODO: center checkbox -->
            <!-- TODO: cart - add collection_selector, see BiobankCard.vue -->
            <b-form-group>
              <!-- <input type="checkbox" v-model="row.item.selected" /> -->
              <collection-selector
                      class="ml-auto"
                      :collectionData=data.item.collection
                      iconOnly
                      bookmark>
              </collection-selector>
            </b-form-group>
          </template>
          <!-- A virtual column to store the index -->
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <!-- Link to the service details page -->
          <template #cell(service_field_id)="data">
            <!--  {{ data.item.service_field_id }} -->
            <span v-if="data.item.service_field_id == '001_disease_models'">
              <img src="@/assets/service_field_icons/001_disease_models.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '002_advanced_technologies_for_personalised_oncology'">
              <img src="@/assets/service_field_icons/002_advanced_technologies_for_personalised_oncology.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '003_biomarkerResearch_development_and_validation'">
              <img src="@/assets/service_field_icons/003_biomarkerResearch_development_and_validation.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '004_new_therapeutic_solutions'">
              <img src="@/assets/service_field_icons/004_new_therapeutic_solutions.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '005_accelerated_translation_into_personalised_oncology_clinical_practice'">
              <img src="@/assets/service_field_icons/005_accelerated_translation_into_personalised_oncology_clinical_practice.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '006_open_digital_research_services'">
              <img src="@/assets/service_field_icons/006_open_digital_research_services.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '007_access_to_human_samples_and_data'">
              <img src="@/assets/service_field_icons/007_access_to_human_samples_and_data.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '010_training'">
              <img src="@/assets/service_field_icons/010_training.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
            <span v-if="data.item.service_field_id == '011_elsi_dimensions'">
              <img src="@/assets/service_field_icons/011_elsi_dimensions.svg" height="24" width="24" id="collectionDetailServiceField"/>
            </span>
          </template>

          <!-- Link to the service details page -->
          <template #cell(name)="data">
            <!-- <b class="text-info">{{ data.item.name }}</b> -->
            <!--path: '/collection/' + this.selected[0].id-->
            <b class="text-info">
              <router-link :to="'/collection/' + data.item.id">{{ data.item.name }}</router-link>
            </b>
          </template>

          <!-- Link to the service details page -->
          <template #cell(provider)="data">
            <!-- <b class="text-info">{{ data.item.provider }}</b> -->
            <!--path: '/collection/' + this.selected[0].id-->
            <b class="text-info">
              <router-link :to="'/biobank/' + data.item.providerId">{{ data.item.provider }}</router-link>
            </b>
          </template>

        </b-table>
        <!--
        <b-table :items="createCollectionTable" :fields="collectiontablefields"
          responsive="sm"
          ref="selectableTable"
          selectable
          @row-selected="onRowSelected">
          <template #cell(selected)="{ rowSelected }">
            <template v-if="rowSelected">
              <span aria-hidden="true">&check;</span>
              <span class="sr-only">Selected</span>
            </template>
            <template v-else>
              <span aria-hidden="true">&nbsp;</span>
              <span class="sr-only">Not selected</span>
            </template>
          </template>
        </b-table>
        -->
        <!--
        <biobank-card v-for="biobank in biobanksShown"
          :key="biobank.id || biobank"
          :biobank="biobank"
          :fullSize="biobanksShown.length === 1">
        </biobank-card>
        -->
      </div>
      <pagination class="mt-4" />
    </div>
    <div v-else-if="!loading && foundBiobanks === 0" class="status-text">
      <h4>No services were found</h4>
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
// import BiobankCard from './cards/BiobankCard.vue'
import Pagination from './buttons/Pagination.vue'
import ResultHeader from './ResultHeader.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import CollectionSelector from './buttons/CollectionSelector.vue'

export default {
  name: 'biobank-cards-container',
  components: {
    // BiobankCard,
    Pagination,
    ResultHeader,
    CollectionSelector
  },
  data () {
    return {
      collectiontablefields: [
        { key: 'selected', label: 'Request', sortable: false },
        { key: 'service_field_id', label: 'Field', sortable: false },
        { key: 'name', label: 'Name', sortable: false },
        { key: 'description', label: 'Description', sortable: false },
        { key: 'provider', label: 'Provider', sortable: false }
        // { key: 'id', label: 'ID', sortable: false, visible: false }
      ]
    }
  },
  methods: {
    debug (...args) {
      console.log(...args)
    },
    onRowSelected (items) {
      this.selected = items
      console.log('Selected ROW: ', items[0])
      console.log('Selected ROW: ', items[0].id)
      this.$router.push({ path: '/collection/' + this.selected[0].id })
    },
    createCollectionTable () {
      return this.biobanksShown.map(biobank => {
        for (let i = 0; i < biobank.collections.length; i++) {
          var retVal = {
            provider: biobank.name,
            collection: biobank.collections[i],
            providerId: biobank.id,
            name: biobank.collections[i].name,
            service_field_id: biobank.collections[i].service_field[0].id,
            description: biobank.collections[i].description,
            id: biobank.collections[i].id
          }
          return retVal
          // if 1-on-1 mapping from collections on level up:
          // return biobank.collections[i]
        }
      })
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
      if (this.loading) return []

      if (this.biobankRsql || this.rsql) {
        return this.biobanks.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        )
      } else {
        return this.biobanks
      }
    },
    biobankIdsToFetch () {
      return this.biobanksShown.filter(it => typeof it === 'string')
    }
  },
  watch: {
    currentPage () {
      if (!this.biobankRsql && !this.rsql) {
        this.QueryBiobanks()
      }
    },
    biobankIdsToFetch (value) {
      if (value.length) {
        this.GetBiobanks(value)
      }
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
