import { popper } from '@popperjs/core';
import { Carousel, Modal } from 'bootstrap';

const sliders = document.querySelectorAll('.slider');
sliders.forEach((el, index) => {
  el.style.order = index;
  
  el.addEventListener('click', function() {
    if (!this.classList.contains('slider--active') ) {
      const curOrder = this.style.order;
      changeOrder(curOrder);
    }
      
  });

});

function changeOrder (curOrder) {
  
  const slidersDOM = document.querySelectorAll('.slider');
  const sliderDOMLength = slidersDOM.length;
  if (curOrder == sliderDOMLength - 1) {
    slidersDOM.forEach((el, index) => {
      if (el.style.order == 0 ) {
        el.style.order = sliderDOMLength - 1;
        el.dataset.index = el.style.order
      } else {
        el.style.order = Number(el.style.order) - 1;
        el.dataset.index = el.style.order
      }
      el.classList.remove('slider--active');
      el.classList.add('slider--hidden');
    });
  } else {
    slidersDOM.forEach((el, index) => {
      if (el.style.order == sliderDOMLength - 1 ) {
        el.style.order = 0;
        el.dataset.index = el.style.order
      } else {
        el.style.order = Number(el.style.order) + 1;
        el.dataset.index = el.style.order
      }
      el.classList.remove('slider--active');
      el.classList.add('slider--hidden');
    });
  }
  const activeSlider = document.querySelector('[data-index="1"]');
  console.log(activeSlider);
  activeSlider.classList.add('slider--active');
  activeSlider.classList.remove('slider--hidden');
}