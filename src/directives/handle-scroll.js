export default {
  bind (el, binding) {
    el.__HandleScrollHandler = event => binding.value(event)
    document.body.addEventListener('mousewheel', el.__HandleScrollHandler)
    document.body.addEventListener('touchmouve', el.__HandleScrollHandler)
  },

  unbind (el) {
    document.body.removeEventListener('mousewheel', el.__HandleScrollHandler__)
    document.body.removeEventListener('touchmove', el.__HandleScrollHandler__)
  }
}
