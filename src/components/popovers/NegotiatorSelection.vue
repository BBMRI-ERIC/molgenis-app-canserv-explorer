<template>
  <b-modal
    hide-header
    id="collectioncart-modal"
    size="lg"
    scrollable
    centered
    body-bg-variant="white"
    footer-bg-variant="warning"
    body-class="pb-0"
    v-model="cartVisible"
    @hide="cartVisible = false">

    <template v-if="selectedCollections.length > 0">
      <div
        class="card mb-3 border"
        :key="`${cart.biobankLabel}-${index}`"
        v-for="(cart, index) in collectionCart">
        <div class="card-header font-weight-bold">
          {{ cart.biobankLabel }}
        </div>
        <div class="collection-cart">
          <div
            class="card-body d-flex border-bottom"
            :key="`${collection.label}-${index}`"
            v-for="(collection, index) in cart.collections">
            <div>
              <!--<font-awesome-icon
                title="Not available for commercial use"
                v-if="isNonCommercialCollection(collection.value)"
                class="text-danger non-commercial mr-1"
                :icon="['fab', 'creative-commons-nc-eu']"/>-->
              <span> {{ collection.label }}</span>
            </div>
            <div class="pl-3 ml-auto">
              <span
                class="fa fa-times text-bold remove-collection"
                title="Remove collection"
                @click="
                  RemoveCollectionsFromSelection({
                    collections: [collection],
                    bookmark: bookmark,
                  })
                "></span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>Please select at least one service to proceed.</p>
    </template>
    <p v-if="isPodium && !collectionsInPodium.length">
      Sorry, none of the samples are currently in Podium.
    </p>
    <template v-slot:modal-footer>
      <b-button class="btn btn-dark mr-auto" @click="removeAllCollections">{{ uiText['remove_all']}}</b-button>
      <div>
        <span class="text-white font-weight-bold d-block">{{
          modalFooterText
        }}</span>
        <!-- <span class="text-white" v-if="selectedNonCommercialCollections > 0">
          <font-awesome-icon
            title="Not available for commercial use"
            class="text-white non-commercial mr-1"
            :icon="['fab', 'creative-commons-nc-eu']"/>
          {{ selectedNonCommercialCollections }} are non-commercial only
        </span> -->
      </div>
      <div class="ml-auto">
        <b-button class="btn btn-dark mr-2" @click="cartVisible = false">{{ uiText['close'] }}</b-button>
      </div>
      <!-- check if URL param "aria_pid" is present using this.$route.query
        if so, only display the button to forward to ARIA for this pid, otherwise display all available pids with info buttons form the website -->
        <div class="ml-auto">
        <b-button
          :disabled="
            (isPodium && !collectionsInPodium.length) ||
            selectedCollections.length < 1
          "
          class="btn btn-secondary ml-auto"
          @click="sendRequest3rdOpenCall">{{ negotiatorOpenCall3ButtonText }}
        </b-button>
        <button type="button" class="btn btn-primary" @click="openInNewTab('https://www.canserv.eu/calls/open-call-for-transnational-service-provision/')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                </svg>
        </button>
      </div>
      <!-- check if URL param "aria_pid" is present using this.$route.query
        if so, only display the button to forward to ARIA for this pid, otherwise display all available pids with info buttons form the website -->
        <div class="ml-auto">
        <b-button
          :disabled="
            (isPodium && !collectionsInPodium.length) ||
            selectedCollections.length < 1
          "
          class="btn btn-secondary ml-auto"
          @click="sendRequest4thChallengeCall">{{ negotiatorChallengeCall4ButtonText }}
        </b-button>
        <!-- TODO: URL for 4th challenge driven call -->
        <button type="button" class="btn btn-primary" @click="openInNewTab('https://www.canserv.eu/calls/challenge-call-training-the-next-generation-of-cancer-researchers/')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                </svg>
        </button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
      default: () => false
    },
    biobankName: {
      type: String,
      required: false
    },
    bookmark: {
      type: Boolean,
      required: false,
      default: () => true
    }

  },
  data: function () {
    return {
      cartVisible: false
    }
  },
  methods: {
    ...mapMutations(['RemoveCollectionsFromSelection']),
    ...mapActions(['SendToARIA', 'SendToNegotiator', 'SendToARIAwithCID', 'SendToBETAARIAwithCID']),
    openInNewTab (url) {
      window.open(url, '_blank', 'noreferrer')
    },
    getNameForBiobank (collectionName) {
      const entryInDictionary = this.collectionBiobankDictionary[collectionName]

      if (entryInDictionary) return entryInDictionary

      if (this.biobankReport) {
        return this.biobankReport.label || this.biobankReport.name
      }

      if (this.collectionReport) {
        return this.collectionReport.biobank_label
      }

      return ''
    },
    groupCollectionsByBiobank (collectionSelectionArray) {
      const biobankWithSelectedCollections = []
      collectionSelectionArray.forEach(cs => {
        const biobankLabel = this.getNameForBiobank(cs.value)
        const biobankPresent = biobankWithSelectedCollections.find(
          bsc => bsc.biobankLabel === biobankLabel
        )

        if (biobankPresent) {
          biobankPresent.collections.push(cs)
        } else {
          biobankWithSelectedCollections.push({
            biobankLabel,
            collections: [cs]
          })
        }
      })
      return biobankWithSelectedCollections
    },
    isNonCommercialCollection (collectionId) {
      return this.nonCommercialCollections.indexOf(collectionId) >= 0
    },
    removeAllCollections () {
      this.cartVisible = false
      this.RemoveCollectionsFromSelection({
        collections: this.currentSelectedCollections,
        bookmark: this.bookmark
      })
    },
    sendRequestChallengeCall () {
      this.cartVisible = false
      this.SendToARIAwithCID({ ARIAcid: 'canserv-2nd-challenge---driven-call' })
    },
    sendRequest3rdOpenCall () {
      this.cartVisible = false
      this.SendToARIAwithCID({ ARIAcid: 'canserv-third-open-call' })
    },
    sendRequest3rdChallengeCall () {
      this.cartVisible = false
      this.SendToARIAwithCID({ ARIAcid: 'canserv-3rd-challenge-driven-call' })
    },
    sendRequest4thChallengeCall () {
      this.cartVisible = false
      this.SendToARIAwithCID({ ARIAcid: 'canserv-4th-challenge-driven-call' })
    },
    sendRequest () {
      this.cartVisible = false
      this.SendToARIAwithCID({ ARIAcid: 257 })
      // this.SendToARIA()
      // this.SendToNegotiator()
    }
  },
  watch: {
    /** if toggled from outside */
    value (newValue) {
      /** only trigger if different */
      if (this.newValue !== this.cartVisible) {
        this.cartVisible = newValue
      }
    },
    cartVisible (visibility) {
      /** send back to parent */
      this.$emit('input', visibility)
    }
  },
  computed: {
    ...mapGetters([
      'collectionsInPodium',
      'selectedCollections',
      'selectedNonCommercialCollections',
      'collectionBiobankDictionary',
      'uiText'
    ]),
    ...mapState([
      'isPodium',
      'nonCommercialCollections',
      'biobankReport',
      'collectionReport'
    ]),
    modalFooterText () {
      const collectionCount = this.isPodium
        ? this.collectionsInPodium.length
        : this.selectedCollections.length
      return this.isPodium
        ? `${collectionCount} services(s) present in Podium`
        : `${collectionCount} services(s) selected`
    },
    negotiatorOpenCallButtonText () {
      return this.isPodium ? this.uiText.send_to_podium : this.uiText.send_to_aria_open_call
    },
    negotiatorChallengeCallXButtonText () {
      return this.isPodium ? this.uiText.send_to_podium : this.uiText.send_to_aria_challenge_call_x
    },
    negotiatorChallengeCall3ButtonText () {
      return this.isPodium ? this.uiText.send_to_podium : this.uiText.send_to_aria_challenge_call_3
    },
    negotiatorChallengeCall4ButtonText () {
      return this.isPodium ? this.uiText.send_to_podium : this.uiText.send_to_aria_challenge_call_4
    },
    negotiatorOpenCall3ButtonText () {
      return this.isPodium ? this.uiText.send_to_podium : this.uiText.send_to_aria_open_call_3
    },
    currentSelectedCollections () {
      return this.isPodium ? this.collectionsInPodium : this.selectedCollections
    },
    collectionCart () {
      return this.groupCollectionsByBiobank(this.currentSelectedCollections)
    }
  }
}
</script>

<style scoped>
.collection-cart > div:last-child {
  border: none !important;
}
</style>
