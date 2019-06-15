const getters = {
  menus: state => state.menu.menus,
  token: state => state.user.token,
  medicines: state => state.data.medicines,
  diseases: state => state.data.diseases,
  dictionary: state => state.yinuo.dictionary,
  user: state => state.user.user
}

export default getters
