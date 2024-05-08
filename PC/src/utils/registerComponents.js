import VButton from '@/components/VButton/VButton'
import SmallBtn from '@/components/VButton/SmallBtn'

export default function (app) {
  app.component('VButton', VButton)
  app.component('SmallBtn', SmallBtn)
  app.use(Lazyload);
}
