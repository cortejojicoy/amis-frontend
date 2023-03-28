<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div class="w-full flex justify-between items-center">
        <div class="text-2xl font-bold">Transaction History</div>
        <div>
          <label for="num-of-items" class="block text-xs text-gray-500">Number of items</label>
          <select v-model="numOfItems" name="num-of-items" id="num-of-items" class="p-2 w-full">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </div>
    <Filters :isLoading="initialLoad" :filter_headers="txnFilters" :filters="filters" @applyFilter="applyFilter"/>
    <div v-if="!initialLoad" class="w-full flex justify-center">
      <CircSpinner :isLoading="transactionLoading" :size="'large'"/>
    </div>
    <div v-if="!transactionLoading">
      <div class="bg-white overflow-auto shadow-xl sm:rounded-lg">
        <table v-show="transaction" class="table-auto w-full items-center text-center">
          <thead>
            <tr class="font-bold">
              <td v-for="(txnHeader, txnHeaderIndex) in transactionHeaders" :key="txnHeaderIndex" class="p-4">{{txnHeader}}</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(txn, txnIndex) in transaction" :key="txnIndex">
              <td v-for="(tValue, tValueIndex) in transactionKeys" :key="tValueIndex" class="px-4 py-3">{{txn[tValue]}}</td>
            </tr>
          </tbody>
        </table>
        <div v-show="transaction.length < 1" class="w-full text-center">
          <p>No transaction history available.</p>
        </div>
        <vs-pagination :total-pages="totalPages" :current-page="currentPage" @change="changePage"></vs-pagination>
      </div>
    </div>
    <Loader v-if="transactionLoading && initialLoad" :loaderType="'table'" :columnNum="6"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import Loader from "./Loader.vue";
import Filters from "./Filters.vue";
import CircSpinner from "./CircSpinner.vue";

export default {
  props: {
    txnType: {
      type: String
    },
    update: {
      type: Number
    },
    userRole: {
      type: String
    },
    txnFilters: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Loader,
    CircSpinner,
    Filters
  },
  computed: {
    ...mapState({
      filters: state => state.transactionHistory.filters,
      currentPage: state => state.transactionHistory.data.txns.current_page,
      totalPages: state => state.transactionHistory.data.txns.last_page,
      transaction: state => state.transactionHistory.data.txns.data,
      transactionKeys: state => state.transactionHistory.data.keys,
      transactionLoading: state => state.transactionHistory.loading,
      initialLoad: state => state.transactionHistory.initialLoad
    }),
    ...mapGetters({
      transactionHeaders: "transactionHistory/getTableHeaders",
      getNumOfItems: "transactionHistory/getNumOfItems",
    }),
    numOfItems: {
      get() {
          return this.getNumOfItems
      },
      set(value) {
          this.updateNumOfItems(value)
          this.getTransactionData(1)
      }
    }
  },
  async fetch () {
    this.updateFilterValues({}) // set the filter values to nothing every time a txn history is rendered
    this.getTransactionData(1) // get the initial data
    this.txnFilters.forEach(txnFilter => { // create the filter values that will be used for this txn history instance
      this.getFilters({ 
        link: this.txnType,
        role: this.userRole,
        data: {
          column_name: txnFilter.field,
          distinct: 'true',
          sais_id: this.$auth.user.sais_id,
          uuid: this.$auth.user.uuid,
          txn_history: 'true'
        }
      })
    });
  },
  methods: {
    ...mapActions({
      getData: 'transactionHistory/getData',
      getFilters: 'transactionHistory/getFilters'
    }),
    ...mapMutations({
      updateNumOfItems: 'transactionHistory/UPDATE_NUM_OF_ITEMS',
      updateFilterValues: 'transactionHistory/UPDATE_FILTER_VALUES'
    }),
    changePage(page) { // change the page of the txn history
      this.getTransactionData(page)
    },
    applyFilter(data) { // apply the filter from the filters component
      this.updateFilterValues(data)
      this.getTransactionData(1)
    },
    getTransactionData(page) { // reusable function for getting the data to be displayed in txn history
      this.getData({
        link: this.txnType,
        role: this.userRole,
        data: {
          page: page,
          items: this.numOfItems,
          order_type: 'desc',
          order_field: this.txnType + '.created_at',
          sais_id: this.$auth.user.sais_id,
          uuid: this.$auth.user.uuid,
          txn_history: 'true'
        }
      })
    }
  },
  watch: { // watch changes from other components. If there is something that triggers this, reload the txn history data
    update(newVal, oldVal) {
      this.changePage(1)
    }
  }
};
</script>