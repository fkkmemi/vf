<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 xl2 v-for="i in 9" :key="i">
        <v-card color="red">
          <v-card-title primary-title v-if="!$vuetify.breakpoint.xs">
            {{$vuetify.breakpoint}}
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
