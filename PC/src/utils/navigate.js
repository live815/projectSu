import router from '@/router'

export function toUserPage(id = 0) {
  let userType = getUserRole()
  switch (userType) {
    case 0:
      if (id == 8) {
        router.push('/VentureInvest')
      } else {
        router.push(`/personal/${id}`)
      }
      break
    case 1:
      router.push('/personalAnchor')
      break
    case 2:
      router.push('/superadmincenter')
      break
  }
}
