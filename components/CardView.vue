<template>
  <div class="card-view flex-container-center" @resize="handleResize()">
    <div class="scroll-snap-container flex-container-center" @scroll="buttonsBarsFade()" @mousewheel="wheelScroll">
      <div class="opacity-bar-right"></div>
      <div class="opacity-bar-left"></div>

      <!-- HOW TO INSERT THE CARD COMPONENTS
      <card-component
        v-for="(card, index) of cardsList"
        :key="`card-index-${index}`"
        :name="..."
        :img="..."
        :label="..."
        ...
        class="scroll-snap-element"
      />
      -->
  
      <div
        v-for="member of cardsList"
        :key="`archetype-type-${member.name}`"
        style="border: 3px solid black;"
        class="scroll-snap-element"
      >
        <img :src="`https://storage.googleapis.com/ygoprodeck.com/pics_artgame/${member.id}.jpg`" style="width: 100%;">
        <p style="text-align: center; margin-top: 0%;">{{ member.name }}</p>
      </div>
      
    </div>
    <div class="prev flex-container-center" @click="click2Scroll('prev')">
      &larr;
    </div>
    <div class="next flex-container-center fade-in" @click="click2Scroll('next')">
      &rarr;
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: {
    cardsList: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      const prevArrow = this.$el.querySelector(".prev");
      const nextArrow = this.$el.querySelector(".next");
      const scrollSnapContainer = this.$el.querySelector(".scroll-snap-container");
      prevArrow.style.fontSize = scrollSnapContainer.offsetHeight*0.48+"%";
      nextArrow.style.fontSize =scrollSnapContainer.offsetHeight*0.48+"%";
    },
    click2Scroll(to) {
      const scrollSnapContainer = this.$el.querySelector(".scroll-snap-container");
      const scrollSnapElement = this.$el.querySelector(".scroll-snap-element");
      if(to === 'prev') {
        scrollSnapContainer.scrollLeft -= scrollSnapElement.offsetWidth;
      }
      else {
        scrollSnapContainer.scrollLeft += scrollSnapElement.offsetWidth;
      }
    },
    wheelScroll(e) {
      e.preventDefault();
      const scrollSnapContainer = this.$el.querySelector(".scroll-snap-container");
      const scrollSnapElement = this.$el.querySelector(".scroll-snap-element");
      scrollSnapContainer.scrollLeft += scrollSnapElement.offsetWidth*Math.sign(e.deltaY);
    },
    buttonsBarsFade() {
      const scrollSnapContainer = this.$el.querySelector(".scroll-snap-container");
      const scrollSnapElements = this.$el.querySelectorAll(".scroll-snap-element");
      const scrollSnapElementWidth = scrollSnapElements[0].offsetWidth;
      const prevArrow = this.$el.querySelector(".prev");
      const nextArrow = this.$el.querySelector(".next");
      if(scrollSnapContainer.scrollLeft > scrollSnapElementWidth/10) {
        if(!prevArrow.style.visibility || prevArrow.style.visibility === "hidden") {
          prevArrow.style.visibility = "visible";
          prevArrow.classList.add("fade-in");
          setTimeout(()=>prevArrow.classList.remove("fade-in"),125);
        }
        this.$el.querySelector(".opacity-bar-left").style.visibility = 'visible';
      }
      else {
        if(prevArrow.style.visibility === "visible") {
          prevArrow.classList.add("fade-out");
          setTimeout(()=>prevArrow.classList.remove("fade-out"),125);
          prevArrow.style.visibility = "hidden";
        }
        this.$el.querySelector(".opacity-bar-left").style.visibility = 'hidden';
      }

      /*
      console.log(`${scrollSnapContainer.scrollLeft} >= ${scrollSnapContainer.scrollWidth} - ${scrollSnapContainer.offsetWidth}`);
      console.log(scrollSnapElementWidth);
      console.log(scrollSnapElementWidth*(scrollSnapElements.length-1));
      */

      if(scrollSnapContainer.scrollLeft > scrollSnapContainer.scrollWidth-scrollSnapContainer.offsetWidth*1.05) {
      //  if(scrollSnapContainer.scrollLeft > scrollSnapElementWidth*scrollSnapElements.length)
        if(nextArrow.style.visibility === "visible") {
          nextArrow.classList.add("fade-out");
          setTimeout(()=>nextArrow.classList.remove("fade-out"),125);
          nextArrow.style.visibility = "hidden";
        }
        this.$el.querySelector(".opacity-bar-right").style.visibility = 'hidden';
      }
      else {
        if(!nextArrow.style.visibility || nextArrow.style.visibility === "hidden") {
          nextArrow.style.visibility = "visible";
          nextArrow.classList.add("fade-in");
          setTimeout(()=>nextArrow.classList.remove("fade-in"),125);
        }
        this.$el.querySelector(".opacity-bar-right").style.visibility = 'visible';
      }
    }
  },
}
</script>

<style scoped>
@import '@/assets/styles/animations.css';
@import '@/assets/styles/containers.css';

.card-view {
  position: relative;
  margin-top: 1%;
  margin-bottom: 1%;
}

/*Arrow styles---------------------------------------------------------------------------------------------------------------*/
.prev, .next {
  position: absolute;
  cursor: pointer;

  color: var(--color-light);
  font-size: 180%;

  background-color: var(--color-neutral);
  border-radius: 50%;
  padding: 0.5em;
}

.prev:hover, .next:hover {
  background-color: var(--color-dark);
}

.prev {
  left: 0;
  visibility: hidden;
}

.next {
  right: 0;
}

/*Container and scrollbar styles---------------------------------------------------------------------------------------------------------------*/
.scroll-snap-container {
  justify-content: flex-start !important;

  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  padding-top: 1%;
  padding-bottom: 0.5%;
}

/* Hide scrollbar
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-snap-container::-webkit-scrollbar {
  display: none;
}
*/

::-webkit-scrollbar {
  height: 1vh;
}

::-webkit-scrollbar-track {
  border-radius: 1vh;
}
 
::-webkit-scrollbar-thumb {
  background: var(--color-neutral); 
  border-radius: 1vh;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-dark); 
}

/*Elements and opacity bars styles---------------------------------------------------------------------------------------------------------------*/
.scroll-snap-element {
  scroll-snap-align: start;

  margin-right: 0.5%;
  margin-left: 0.5%;

  min-width: 35% !important;
}

.opacity-bar-right {
  position: absolute;
  right: -1%;
  width: 8.5%;
  height: 100%;
  background: linear-gradient(270deg, var(--color-light) 35.53%, rgba(214, 214, 177, 0) 100%);
}

.opacity-bar-left {
  position: absolute;
  left: -1%;
  width: 8.5%;
  height: 100%;
  visibility: hidden;
  background: linear-gradient(90deg, var(--color-light) 35.53%, rgba(214, 214, 177, 0) 100%);
}

/*Media query---------------------------------------------------------------------------------------------------------------*/
@media only screen and (max-width: 840px) {
  .prev, .next {
    font-size: 250%;
  }

  .scroll-snap-element {
    min-width: 70% !important;
  }

  .opacity-bar-right , .opacity-bar-left {
    width: 9%;
  }
}
</style>