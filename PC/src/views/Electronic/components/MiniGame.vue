<template>
  <div class="item-box" v-if="game" @click.stop="usePlayGame(game, $router, $route)">
    <div class="fav-icon">
      <img
        :src="slotGameStore.collectIds.includes(game.id) ? favorite : non_favorite"
        alt=""
        @click.stop="slotGameStore.collect(game.id)"
      />
    </div>
    <div class="img-box">
      <img
        v-lazy="game.appLobbySlotIcon ? getImgUrl(game.appLobbySlotIcon) : defaultGame"
        width="240"
      />
    </div>
    <div class="title-box">
      <p>{{ game.lobbyName }}</p>
    </div>
  </div>
</template>

<script setup>
import { getImgUrl } from '@/utils'
import favorite from '../img/favorite.png'
import { usePlayGame } from '@/hooks/usePlayGame'
import non_favorite from '../img/non_favorite.png'
import { useSlotGameStore } from '@/stores/slotGame'
import defaultGame from '@/assets/img/default-game.png'

const slotGameStore = useSlotGameStore()
const props = defineProps({
  game: {
    type: Object,
    default: () => {
      return null
    }
  }
})
</script>

<style lang="scss" scoped>
.item-box {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 285px;
  border-radius: 6px;
  background: var(--unnamed, #1d223c);
  box-shadow: 0px 30px 60px 0px rgba(0, 0, 0, 0.5);
  .img-box {
    cursor: pointer;
    img {
      &[lazy='loaded'] {
        animation: rubberBand 0.8s 1;
      }
    }
  }

  .title-box {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    p {
      color: var(--100, #fff);
      text-align: center;

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
    }
  }
  .fav-icon {
    position: absolute;
    top: 0;
    right: 0;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .fav-icon:hover {
    cursor: pointer;
  }
}
</style>
