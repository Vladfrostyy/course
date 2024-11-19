class ItcAccordion {
    constructor(target, config) {
      this._el = typeof target === 'string' ? document.querySelector(target) : target;
      const defaultConfig = {
        alwaysOpen: true,
        duration: 350
      };
      this._config = Object.assign(defaultConfig, config);
      this.addEventListener();
    }
    addEventListener() {
      this._el.addEventListener('click', (e) => {
        const elHeader = e.target.closest('.accordion__header');
        if (!elHeader) {
          return;
        }
        if (!this._config.alwaysOpen) {
          const elOpenItem = this._el.querySelector('.accordion__item_show');
          if (elOpenItem) {
            elOpenItem !== elHeader.parentElement ? this.toggle(elOpenItem) : null;
          }
        }
        this.toggle(elHeader.parentElement);
      });
    }
    show(el) {
      const elBody = el.querySelector('.accordion__body');
      if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
        return;
      }
      elBody.style['display'] = 'block';
      const height = elBody.offsetHeight;
      elBody.style['height'] = 0;
      elBody.style['overflow'] = 'hidden';
      elBody.style['transition'] = `height ${this._config.duration}ms ease`;
      elBody.classList.add('collapsing');
      el.classList.add('accordion__item_slidedown');
      elBody.offsetHeight;
      elBody.style['height'] = `${height}px`;
      window.setTimeout(() => {
        elBody.classList.remove('collapsing');
        el.classList.remove('accordion__item_slidedown');
        elBody.classList.add('collapse');
        el.classList.add('accordion__item_show');
        elBody.style['display'] = '';
        elBody.style['height'] = '';
        elBody.style['transition'] = '';
        elBody.style['overflow'] = '';
      }, this._config.duration);
    }
    hide(el) {
      const elBody = el.querySelector('.accordion__body');
      if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
        return;
      }
      elBody.style['height'] = `${elBody.offsetHeight}px`;
      elBody.offsetHeight;
      elBody.style['display'] = 'block';
      elBody.style['height'] = 0;
      elBody.style['overflow'] = 'hidden';
      elBody.style['transition'] = `height ${this._config.duration}ms ease`;
      elBody.classList.remove('collapse');
      el.classList.remove('accordion__item_show');
      elBody.classList.add('collapsing');
      window.setTimeout(() => {
        elBody.classList.remove('collapsing');
        elBody.classList.add('collapse');
        elBody.style['display'] = '';
        elBody.style['height'] = '';
        elBody.style['transition'] = '';
        elBody.style['overflow'] = '';
      }, this._config.duration);
    }
    toggle(el) {
      el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
  }



  new ItcAccordion(document.querySelector('.accordion'), {
    alwaysOpen: true
  });

  const animItems = document.querySelectorAll('._anim-item')

  if (animItems.length > 0) {
      window.addEventListener('scroll', animONscroll)
      function animONscroll() {
          for (let i = 0; i < animItems.length; i++) {
              const animItem = animItems[i];
              const animHeight = animItem.offsetHeight
              const animOffset = offset(animItem).top
              const animStart = 4
              
              let animPoint = window.innerHeight - animHeight / animStart
              if (animHeight > window.innerHeight) {
                  animPoint = window.innerHeight - window.innerHeight / animStart
              }
              
              if ((pageYOffset > animOffset - animPoint) && pageYOffset < (animOffset + animHeight)) {
                  animItem.classList.add('actives')
              } else {
                  if (!animItem.classList.contains('_no-anim')) {
                      animItem.classList.remove('actives')
                  }
              }
          }
      }
      function offset(el){
      const rect = el.getBoundingClientRect(), 
      scrollLeft = window.pageXOffset ||  document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
       return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
      }
      
      setTimeout(() => {
          animONscroll()
      }, 300);
  }