<template>
  <v-card :loading="loading">
    <v-toolbar color="transparent" dense flat>
      <v-toolbar-title>{{ item.email }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="showDetail = !showDetail" icon>
        <v-icon>{{ showDetail ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-btn icon @click="del" color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-0"></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="5">
          <v-img aspect-ratio="1" :src="item.photoURL | imgCheck"></v-img>
        </v-col>
        <v-col cols="7">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                이름
              </v-list-item-title>
              <v-list-item-subtitle>
                {{item.displayName | nameCheck}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                계정 유형
              </v-list-item-title>
              <v-list-item-subtitle>
                {{levels[item.level].text}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    :color="levels[item.level].color"
                    v-on="on"
                  >
                    <v-icon>{{ levels[item.level].icon }}</v-icon>
                  </v-btn>
                </template>

                <v-list rounded>
                  <v-list-item-group v-model="item.level" color="primary">
                    <v-list-item
                      v-for="(level, i) in levels"
                      :key="i"
                      @click="levelChange(i)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="level.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ level.text }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
        </v-col>
        <v-col cols="12" v-if="showDetail">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                최초 등록일
              </v-list-item-title>
              <v-list-item-subtitle>
                {{new Date(item.createdAt).toLocaleString()}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                수정일
              </v-list-item-title>
              <v-list-item-subtitle>
                {{new Date(item.updatedAt).toLocaleString()}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                최근 방문일
              </v-list-item-title>
              <v-list-item-subtitle>
                {{new Date(item.visitedAt).toLocaleString()}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                최근 방문 횟수
              </v-list-item-title>
              <v-list-item-subtitle>
                {{item.visitCount}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['item'],
  data () {
    return {
      loading: false,
      levels: [
        { text: '관리자', icon: 'mdi-account-key', color: 'primary' },
        { text: '사용자', icon: 'mdi-account-check', color: 'success' },
        { text: '손님', icon: 'mdi-account-alert', color: 'warning' }
      ],
      showDetail: false
    }
  },
  filters: {
    nameCheck: function (v) {
      if (v) return v
      return 'no name'
    },
    imgCheck (v) {
      if (v) return v
      return require('@/assets/images/account.png')
    }
  },
  methods: {
    async levelChange (level) {
      if (level === 0) {
        const r = await this.$swal.fire({
          title: '정말 변경하시겠습니까?',
          text: '관리자는 권한은 위험할 수 있습니다.',
          type: 'warning',
          confirmButtonText: '확인',
          cancelButtonText: '취소',
          showCancelButton: true
        })
        if (!r.value) return
      }
      this.loading = true
      try {
        await this.$axios.patch(`/admin/user/${this.item.uid}/level`, { level })
      } catch (e) {
        this.$toasted.global.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async del () {
      const r = await this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제 후 되돌릴 수 없습니다.',
        type: 'error',
        // confirmButtonText: 'Cool',
        showCancelButton: true
      })
      if (!r.value) return
      this.loading = true
      try {
        await this.$axios.delete(`/admin/user/${this.item.uid}`)
        this.$emit('del')
      } catch (e) {
        this.$toasted.global.error(e.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
