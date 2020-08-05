let _Vue
_Vue

class VueRouter {
  constructor(options) {
    console.log(options)
    this.$options = options
    this.current = ''
    window.addEventListener('hashchange', this.onHashChange)
    this.routeObj = {}
    if(options) {
      options.routes.forEach(item => {
        this.routeObj[item.path] = item.component
      })
    }
    
  }

  onHashChange = () => {
    this.current = window.location.hash.slice(1)
    console.log(this.routeObj[this.current])
  }
}

VueRouter.install = function(Vue) {
  _Vue = Vue

  Vue.mixin({
    beforeCreated() {
      Vue.prototype.$route = this.$options
    }
  })

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, [
        this.$slots.default
      ])
    }
  })

  Vue.component('router-view', {
    render(h) {
      console.log(this.$route)
      return h()
    }
  })
}

export default VueRouter