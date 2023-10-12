<template>
  <!-- template -->
  <article
    :class="[
      {
        'border-secondary': biobankInSelection,
        'border-light': !biobankInSelection,
        'back-side': showCollections,
      },
      fullSize ? 'biobank-card-large' : 'biobank-card',
    ]">
    <section
      class="d-flex flex-column align-items-center">
      <div v-if="loading" class="loading-screen">
        <span class="fa fa-spinner fa-spin fa-lg" aria-hidden="true"></span>
      </div>
      <div class="align-self-stretch" v-else>
        <header class="border-0 card-header p-1">
          <h5 class="pt-1 pl-1 pr-1 mt-1">
            <router-link
              :to="'/biobank/' + biobank.id"
              title="Biobank details"
              class="text-dark">
              <span
                class="fa fa-server mr-2 text-primary"
                aria-hidden="true"></span>
              <span class="biobank-name">{{ biobank.name }}</span>
              <sup
                v-if="hasBiobankQuality"
                class="d-inline-block"
                aria-hidden="true">
                <info-popover
                  faIcon="fa-check-circle-o"
                  textColor="text-success"
                  class="ml-1 certificate-icon"
                  popover-placement="bottom">
                  <div
                    class="popover-content"
                    v-for="quality of biobankQualities"
                    :key="quality.label">
                    <b>{{ quality.label }}</b>
                    <p class="mt-1">
                      {{ qualityStandardsDictionary[quality.label] }}
                    </p>
                  </div>
                </info-popover>
              </sup>
            </router-link>
            <div>
              <!-- add icons for service field for Service Provider View - back of card -->
              <!--
              {{debug("FrontbiobankCollectionServiceFields:", biobankCollectionServiceFields(biobank.collectionDetails))}}
              <span v-for="service_fields in biobankCollectionServiceFields(biobank.collectionDetails)" :key="service_fields">
                <span v-if="service_fields == '001_disease_models'">
                  <img src="@/assets/service_field_icons/001_disease_models.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '002_advanced_technologies_for_personalised_oncology'">
                        <img src="@/assets/service_field_icons/002_advanced_technologies_for_personalised_oncology.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '003_biomarkerResearch_development_and_validation'">
                  <img src="@/assets/service_field_icons/003_biomarkerResearch_development_and_validation.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '004_new_therapeutic_solutions'">
                  <img src="@/assets/service_field_icons/004_new_therapeutic_solutions.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '005_accelerated_translation_into_personalised_oncology_clinical_practice'">
                  <img src="@/assets/service_field_icons/005_accelerated_translation_into_personalised_oncology_clinical_practice.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '006_open_digital_research_services'">
                  <img src="@/assets/service_field_icons/006_open_digital_research_services.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '010_training'">
                  <img src="@/assets/service_field_icons/010_training.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
              </span>
              -->
            <!-- {{debug("biobankCollectionServiceField:", biobankCollectionServiceField(biobank.collectionDetails))}} -->
            <!-- <span v-for="(collectionDetail) of biobank.collectionDetails" :key="collectionDetail.id">
              <span v-for="service_fields in collectionDetail.service_field" :key="service_fields.id">-->
            {{debug("biobankCollectionServiceFields:", biobankCollectionServiceFields(biobank.collectionDetails))}}
            <span v-for="service_fields in biobankCollectionServiceFields(biobank.collectionDetails)" :key="service_fields">
                <span v-if="service_fields == '001_disease_models'">
                  <img src="@/assets/service_field_icons/001_disease_models.svg" height="24" width="24" id="collectionDetailServiceField" alt="Disease Models" title="Disease Models"/>
                </span>
                <span v-if="service_fields == '002_advanced_technologies_for_personalised_oncology'">
                        <img src="@/assets/service_field_icons/002_advanced_technologies_for_personalised_oncology.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '003_biomarkerResearch_development_and_validation'">
                  <img src="@/assets/service_field_icons/003_biomarkerResearch_development_and_validation.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '004_new_therapeutic_solutions'">
                  <img src="@/assets/service_field_icons/004_new_therapeutic_solutions.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '005_accelerated_translation_into_personalised_oncology_clinical_practice'">
                  <img src="@/assets/service_field_icons/005_accelerated_translation_into_personalised_oncology_clinical_practice.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '006_open_digital_research_services'">
                  <img src="@/assets/service_field_icons/006_open_digital_research_services.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '007_access_to_human_samples_and_data'">
                  <img src="@/assets/service_field_icons/007_access_to_human_samples_and_data.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '010_training'">
                  <img src="@/assets/service_field_icons/010_training.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
                <span v-if="service_fields == '011_elsi_dimensions'">
                  <img src="@/assets/service_field_icons/011_elsi_dimensions.svg" height="24" width="24" id="collectionDetailServiceField"/>
                </span>
            </span>
            </div>
          </h5>
        </header>

        <div v-if="!loading && !showCollections">
          <div class="mb-1 shadow-sm" v-if="numberOfCollections">
            <button
              class="btn btn-link text-info pl-2"
              @click.prevent="showCollections = true">
              {{ uiText["card_collections_details"] }}
            </button>
          </div>
          <div class="p-2 pt-1 biobank-section" :style="cardContainerHeight">
            <small>
              <view-generator :viewmodel="biobankcardViewmodel" />
              <matches-on :viewmodel="biobank" />
              <router-link
                :to="'/biobank/' + biobank.id"
                :title="`${biobank.name} details`"
                class="text-info ml-1">
                <span>More details</span>
              </router-link>
            </small>
          </div>
        </div>

        <div v-else>
          <div class="d-flex mb-1 shadow-sm">
            <button
              class="btn btn-link text-info pl-2"
              @click.prevent="showCollections = false">
              {{ uiText["card_biobank_details"] }}
            </button>
          </div>
          <div class="collections-section" :style="cardContainerHeight">
            <div class="pl-2 pt-2 d-flex" v-if="numberOfCollections">
              <h5>
                {{ numberOfCollections }} service{{
                  numberOfCollections === 1 ? "" : "s"
                }}
                available
              </h5>
              <collection-selector
                v-if="numberOfCollections > 1"
                class="text-right mr-1 ml-auto align-self-center"
                :collectionData="biobank.collections"
                bookmark
                iconOnly
                multi></collection-selector>
            </div>
            <div class="pl-2" v-if="!numberOfCollections">
              This Service Provider is not offering any services yet.
            </div>
            {{debug("BiobankCard-biobank collection details - loading")}}
            {{debug("BiobankCard-biobank collection details", JSON.stringify(biobank.collectionDetails))}}
            <div
              class="collection-items mx-1"
              v-for="(collectionDetail, index) of biobank.collectionDetails"
              :key="collectionDetail.id">
              <div v-if="showCollections" class="mb-2">
                <div class="pl-2 pt-2 d-flex">
                  <router-link
                    :to="'/collection/' + collectionDetail.id"
                    title="Collection details"
                    class="text-dark">
                    <!-- use a computed property for the display of the collectionDetail Icon -->
                    <!--<img v-bind:src="require('@/assets/service_field_icons/'+collectionServiceFieldIcon(collectionDetail)+'.svg')" height="24" width="24" id="collectionDetailServiceField"/>-->
                    <!--                <img v-bind:src="require('@/assets/service_field_icons/'+collectionDetail.service_field.id+'.svg')" height="24" width="24" id="collectionDetailServiceField"/>-->
                    <!-- <img :src="imgUrl" height="24" width="24" id="collectionDetailServiceField"/> -->
                    <span v-for="service_fields in collectionDetail.service_field" :key="service_fields.id">
                      <span v-if="service_fields.id == '001_disease_models'">
                        <img src="@/assets/service_field_icons/001_disease_models.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '002_advanced_technologies_for_personalised_oncology'">
                        <img src="@/assets/service_field_icons/002_advanced_technologies_for_personalised_oncology.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '003_biomarkerResearch_development_and_validation'">
                        <img src="@/assets/service_field_icons/003_biomarkerResearch_development_and_validation.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '004_new_therapeutic_solutions'">
                        <img src="@/assets/service_field_icons/004_new_therapeutic_solutions.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '005_accelerated_translation_into_personalised_oncology_clinical_practice'">
                        <img src="@/assets/service_field_icons/005_accelerated_translation_into_personalised_oncology_clinical_practice.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '006_open_digital_research_services'">
                        <img src="@/assets/service_field_icons/006_open_digital_research_services.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields == '007_access_to_human_samples_and_data'">
                        <img src="@/assets/service_field_icons/007_access_to_human_samples_and_data.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '010_training'">
                        <img src="@/assets/service_field_icons/010_training.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                      <span v-if="service_fields.id == '011_elsi_dimensions'">
                        <img src="@/assets/service_field_icons/011_elsi_dimensions.svg" height="24" width="24" id="collectionDetailServiceField"/>
                      </span>
                    </span>
                    <span class="collection-name">{{
                      collectionDetail.name
                    }}</span>
                  </router-link>
                  <div class="ml-auto">
                    <collection-selector
                      class="ml-auto"
                      :collectionData="collectionDetail"
                      iconOnly
                      bookmark></collection-selector>
                  </div>
                </div>

                <small>
                  <view-generator
                    class="p-1"
                    :viewmodel="collectionViewmodel(collectionDetail)"/>

                  <matches-on :viewmodel="collectionDetail" class="px-1 ml-1" />
                  <router-link
                    :to="'/collection/' + collectionDetail.id"
                    :title="`${collectionDetail.name} details`"
                    class="text-info ml-1 pl-1">
                    <span>More details</span>
                  </router-link>
                </small>
                <hr v-if="index != lastCollection" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import {
  getBiobankDetails,
  getCollectionDetails
} from '../../utils/templateMapper'
import ViewGenerator from '../generators/ViewGenerator.vue'
import CollectionSelector from '../buttons/CollectionSelector.vue'
import MatchesOn from '../generators/view-components/MatchesOn.vue'
import InfoPopover from '../popovers/InfoPopover.vue'

export default {
  name: 'biobank-card',
  components: {
    ViewGenerator,
    CollectionSelector,
    MatchesOn,
    InfoPopover
  },
  props: {
    fullSize: {
      type: Boolean,
      default: () => false
    },
    biobank: {
      type: [Object, String]
    }
  },
  data () {
    return {
      displayed_fields: [],
      biobankSelected: false,
      showCollections: false
    }
  },
  methods: {
    debug (...args) {
      console.log(...args)
    },
    /**
     * Map the service fields to icons bc is biobank.collections
     */
    /*
    biobankCollectionServiceField (biobankCollections) {
      let biobankCollectionServiceField = []
      // const biobankCollectionAllServiceFields = [];
      console.log('BiobankCard-biobankCollectionServiceField-1')
      if (!biobankCollections) {
        console.log('BiobankCard-biobankCollectionServiceField-2')
        return biobankCollectionServiceField
      }
      console.log('BiobankCard-biobankCollectionServiceField-3', biobankCollections)
      const biobankCollectionAllServiceFields = biobankCollections
        .filter(bcsf => bcsf.service_field)
      // .map(bc => ({ label: bc.service_field.label, value: bc.service_field.id }))
      console.log('BiobankCard-biobankCollectionServiceField-4', biobankCollectionAllServiceFields)
      biobankCollectionServiceField = biobankCollectionAllServiceFields
        .map(sc => sc.service_field.id)
        .some(id => biobankCollectionAllServiceFields.map(pc => pc.value).includes(id))
      console.log('BiobankCard-biobankCollectionServiceField-5', biobankCollectionServiceField)
      return biobankCollectionServiceField
    },
    */
    biobankCollectionServiceFields (biobankCollections) {
      const serviceFields = []
      for (const coll of biobankCollections) {
        for (const collsf of coll.service_field) {
          console.log('BiobankCard-biobankCollectionServiceFields-if', serviceFields, !serviceFields.includes(collsf.id), collsf)
          if (!serviceFields.includes(collsf.id)) {
            serviceFields.push(collsf.id)
          }
        }
      }
      console.log('BiobankCard-biobankCollectionServiceFields-5', serviceFields)
      return serviceFields
    },
    /*
      console.log('BiobankCard-biobankCollectionServiceField-3', this.biobank.collections)
      const biobankCollectionServiceField = this.biobank.collections
        .filter(bcf => bcf.service_field)
      //  .map(bc => ({ label: bc.label, value: bc.id }))
      console.log('BiobankCard-biobankCollectionServiceField-4', biobankCollectionServiceField)
      const thisBiobankServiceFields = biobankCollectionServiceField
        .map(sc => sc.value)
        .some(id => biobankCollectionServiceField.map(pc => pc.value).includes(id))
      console.log('BiobankCard-biobankCollectionServiceField-5', thisBiobankServiceFields)
    */
    byString (o, s) {
      s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
      s = s.replace(/^\./, '') // strip a leading dot
      var a = s.split('.')
      for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i]
        if (k in o) {
          o = o[k]
        } else {
          return
        }
      }
      return o
    },
    collectionServiceFieldIcon (serviceField) {
      return '@/assets/service_field_icons/' + serviceField + '.svg'
    },
    getCollectionDetails,
    collectionViewmodel (collectiondetails) {
      const attributes = []
      for (const item of this.collectionColumns) {
        if (item.showOnBiobankCard) {
          attributes.push(
            collectiondetails.viewmodel.attributes.find(
              (vm) => vm.label === item.label
            )
          )
        }
      }
      return { attributes }
    }
  },
  computed: {
    ...mapState([
      'biobankColumns',
      'collectionColumns',
      'biobankCardShowCollections',
      'qualityStandardsDictionary'
    ]),
    ...mapGetters(['selectedCollections', 'uiText']),
    lastCollection () {
      return this.biobank.collectionDetails.length - 1
    },
    numberOfCollections () {
      return this.biobank.collectionDetails
        ? this.biobank.collectionDetails.length
        : 0
    },
    cardContainerHeight () {
      const charactersInName = this.biobank.name.length

      // TODO: add icon height to calculation
      let height = 17.5 // default

      if (charactersInName <= 30) {
        height = 17.2
      }

      /** When a biobank name is too long it will take three rows (most of the time), tipping point is 80 characters. */
      if (charactersInName >= 70) {
        height = 14.2
      }

      if (charactersInName >= 100) {
        height = 14.7
      }

      return `height: ${height}rem;max-height: ${height}rem;`
    },
    biobankcardViewmodel () {
      // check if biobank is still loading
      if (this.loading) return {}

      const { viewmodel } = getBiobankDetails(this.biobank)
      const attributes = []

      for (const item of this.biobankColumns) {
        if (item.showOnBiobankCard) {
          attributes.push(
            viewmodel.attributes.find((vm) => vm.label === item.label)
          )
        }
      }
      return { attributes }
    },
    hasBiobankQuality () {
      return this.biobankcardViewmodel.attributes.some(
        (attr) => attr.type === 'quality' && attr.value && attr.value.length
      )
    },
    biobankQualities () {
      return this.biobankcardViewmodel.attributes.find(
        (attr) => attr.type === 'quality'
      ).value
    },
    // broken
    biobankInSelection () {
      if (!this.biobank.collections) return false

      const biobankCollectionSelection = this.biobank.collections
        .filter((bcf) => !bcf.parent_collection)
        .map((bc) => ({ label: bc.label || bc.name, value: bc.id }))
      return this.selectedCollections
        .map((sc) => sc.value)
        .some((id) =>
          biobankCollectionSelection.map((pc) => pc.value).includes(id)
        )
    },
    loading () {
      return typeof this.biobank === 'string'
    }
  },
  mounted () {
    this.showCollections = this.biobankCardShowCollections
  }
}
</script>

<style scoped>
.collection-icon {
  position: relative;
  top: 0.25em;
  clip-path: inset(-15% 0% 75% 0%);
}

.certificate-icon {
  font-size: 0.8rem;
}
</style>

<style>
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.btn-link:focus {
  box-shadow: none;
}

.biobank-section,
.collections-section {
  overflow: auto;
}

.collection-items {
  word-break: break-word;
}

.collection-items th {
  width: 25%;
}

.biobank-card {
  width: 25rem;
}

.biobank-card-large {
  width: 90%;
}

.biobank-card > header,
.collection-header {
  display: flex;
  min-height: 3rem;
  flex-direction: column;
  justify-content: center;
}

/* TODO put in theme */
.card-header {
  background-color: #efefef;
}

article {
  padding: 1.5rem;
}

article footer {
  padding: 1.5rem 0 0 0;
}
article {
  padding: 0;
  position: relative;
  height: 28rem;
}

article {
  box-shadow: 0 6.4px 14.4px 0 rgba(0, 0, 0, 0.132),
    0 1.2px 3.6px 0 rgba(0, 0, 0, 0.108);
}

article section {
  height: 100%;
  width: 100%;
}
</style>
