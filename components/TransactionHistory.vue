<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div class="w-full">
        <div class="text-2xl font-bold">Transaction History</div>
        <div v-if="!initialLoad" class="w-full flex justify-center">
          <CircSpinner :isLoading="transactionLoading" :size="'large'"/>
        </div>
        <Loader v-else :loaderType="'table'" :columnNum="6"/>
      </div>
    </div>
    <div v-if="!transactionLoading" class="bg-white overflow-auto shadow-xl sm:rounded-lg">
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
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Loader from "./Loader.vue";
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
    }
  },
  components: {
    Loader,
    CircSpinner
  },
  computed: {
    ...mapState({
      currentPage: state => state.transactionHistory.data.txns.current_page,
      totalPages: state => state.transactionHistory.data.txns.last_page,
      transaction: state => state.transactionHistory.data.txns.data,
      transactionKeys: state => state.transactionHistory.data.keys,
      transactionLoading: state => state.transactionHistory.loading,
      initialLoad: state => state.transactionHistory.initialLoad
    }),
    ...mapGetters({
      transactionHeaders: "transactionHistory/getTableHeaders",
    })
  },
  async fetch () {
    this.getTransactionData({
      link: this.txnType,
      role: this.userRole,
      data: {
        page: 1,
        items: 5,
        order_type: 'desc',
        order_field: 'coitxns.created_at',
        sais_id: this.$auth.user.sais_id
      }
    })
  },
  methods: {
    ...mapActions({
      getTransactionData: 'transactionHistory/getData',
    }),
    changePage(page) {
      this.getTransactionData({
        link: this.txnType,
        role: this.userRole,
        data: {
          page: page,
          items: 5,
          order_type: 'desc',
          order_field: 'coitxns.created_at',
          sais_id: this.$auth.user.sais_id
        }
      })
    }
  },
  watch: {
    update(newVal, oldVal) {
      this.changePage(1)
    }
  }
};
</script>