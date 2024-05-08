import VButton from '@/components/VButton/VButton'
import SmallBtn from '@/components/VButton/SmallBtn'
import { Lazyload } from 'vant';

export default function (app) {
  app.component('VButton', VButton)
  app.component('SmallBtn', SmallBtn)
  app.use(Lazyload);
}
