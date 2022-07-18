import { createLocalVue, mount } from '@vue/test-utils'
import CheckboxFilter from '@/components/filters/CheckboxFilter.vue'
import SatisfyAllRadiobutton from '@/components/micro-components/SatisfyAllRadiobutton.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import { baseGetters } from '../../mockData'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    ...baseGetters
  }
})

function getWrapper (props = {}) {
  const propsData = {
    ...props,
    value: [],
    options: async () => {
      return [
        { value: 'foo', text: 'Foo' },
        { value: 'bar', text: 'Bar' },
        { value: 'baz', text: 'Baz' }
      ]
    }
  }

  const wrapper = mount(CheckboxFilter, {
    localVue,
    store,
    components: { SatisfyAllRadiobutton },
    stubs: ['font-awesome-icon'],
    propsData,
    listeners: {
      input: (newVal) => {
        wrapper.setProps({ value: newVal })
      }
    }
  })
  return wrapper
}

describe('CheckboxFilter.vue', () => {
  describe('Parsing only required props', () => {
    let wrapper
    beforeEach(() => { wrapper = getWrapper({}) })

    it('can set and unset values', async () => {
      const inputElements = wrapper.findAll('input')
      inputElements.at(0).trigger('click') // select foo
      inputElements.at(1).trigger('click') // select bar
      inputElements.at(2).trigger('click') // select baz
      inputElements.at(1).trigger('click') // deselect bar
      await localVue.nextTick()
      expect(wrapper.emitted('input')[0]).toEqual([['foo', 'baz']])
    })

    it('can return objects', async () => {
      wrapper.setProps({ returnTypeAsObject: true })

      const inputElements = wrapper.findAll('input')
      inputElements.at(0).trigger('click') // select foo
      inputElements.at(1).trigger('click') // select bar
      await localVue.nextTick()
      expect(wrapper.emitted('input')[0]).toEqual([[{ value: 'foo', text: 'Foo' },
        { value: 'bar', text: 'Bar' }]])
    })

    it('can select all and deselect all', async () => {
      const toggleSelect = wrapper.find('.toggle-select')
      expect(toggleSelect.text()).toBe('Select all')
      await toggleSelect.trigger('click') // select all
      expect(toggleSelect.text()).toBe('Deselect all')
      expect(wrapper.findAll('input[type=checkbox]:checked').length).toEqual(3)
      await toggleSelect.trigger('click') // deselect all
      expect(wrapper.findAll('input[type=checkbox]:checked').length).toEqual(0)
    })
  })

  describe('When restricting maxVisibleOptions to 1', () => {
    let wrapper
    beforeEach(() => { wrapper = getWrapper({ maxVisibleOptions: 1 }) })

    it('can hide elements based on maxVisibleOptions', async () => {
      expect(wrapper.findAll('input[type=checkbox]').length).toBe(1)

      const sliceButton = wrapper.find('.toggle-slice')
      await sliceButton.trigger('click')
      expect(wrapper.findAll('input[type=checkbox]').length).toBe(3)
      await sliceButton.trigger('click')
      expect(wrapper.findAll('input[type=checkbox]').length).toBe(1)
    })
  })

  describe('SatisfyAllRadiobutton', () => {
    it('checks that the satisfyAll radiobutton is not shown by default ', () => {
      const wrapper = getWrapper()
      const satisfyAllButton = wrapper.find('#any')
      expect(satisfyAllButton.exists()).toBe(false)
    })

    it('triggers the proper emit when the satisfyAll radiobutton is clicked', async () => {
      const wrapper = getWrapper({ showSatisfyAllSelector: true })
      const satisfyAllButton = wrapper.find('#all')
      await satisfyAllButton.trigger('click')
      expect(wrapper.emitted('satisfy-all')).toEqual([[true]])
    })
  })
})
