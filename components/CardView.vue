<template>
  <div class="card-view">
    <div class="scroll-snap-container" @scroll="buttonsBarsFade()" @mousewheel="wheelScroll">
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

      <!--
      <archetype
        v-for="(archetype, index) of cardsList"
        :key="`archetype-index-${index}`"
        :name="'archetypearchetype'"
        :true_name="'archetypetrue_name'"
        :members="[]"
        :date="index"
        :attributes="['EARTH']"
        :types="['Fairy']"
        :imgs='{"Poster":56588755,"Effect":22073844,"Ritual":40352445,"Fusion":41373230}'
        :crest='"/crests/Labrynth.png"'
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
    <div v-show="isLoad" class="prev" @click="click2Scroll('prev')">
      &larr;
    </div>
    <div v-show="isLoad" class="next fade-in" @click="click2Scroll('next')">
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
  data: () => ({
    isLoad: false
  }),
  mounted() {
    this.$el.querySelector(".prev").style.fontSize = window.matchMedia('(max-width: 920px)').matches ? "250%" : "180%";
    this.$el.querySelector(".next").style.fontSize = window.matchMedia('(max-width: 920px)').matches ? "250%" : "180%";
    window.addEventListener('resize', this.handleResize);
    /*
    const prevArrow = this.$el.querySelector(".prev");
    const nextArrow = this.$el.querySelector(".next");
    const scrollSnapContainer = this.$el.querySelector(".scroll-snap-container");
    prevArrow.style.fontSize = scrollSnapContainer.offsetHeight*0.48+"%";
    nextArrow.style.fontSize = scrollSnapContainer.offsetHeight*0.48+"%";
    */
    this.isLoad = true;
  },
  methods: {
    handleResize() {
      this.$el.querySelector(".prev").style.fontSize = window.matchMedia('(max-width: 920px)').matches ? "250%" : "180%";
      this.$el.querySelector(".next").style.fontSize = window.matchMedia('(max-width: 920px)').matches ? "250%" : "180%";
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
.card-view {
  position: relative;
  display: flex;
  align-items: center;

  margin-top: 1%;
  margin-bottom: 1%;
}

/*Arrow styles---------------------------------------------------------------------------------------------------------------*/
.prev, .next {
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  cursor: pointer;

  background-color: rgba(230, 133, 133, 0.488);
  border-radius: 50%;
  padding: 0.5em;
}

.fade-in {
  animation: fade-in-animation 0.25s ease-in forwards;
}

@keyframes fade-in-animation {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}

.fade-out {
  animation: fade-in-animation 0.25s ease-in forwards;
  animation-direction: reverse;
}

.prev:hover, .next:hover {
  background-color: rgba(142, 79, 79, 0.488);
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  background: darkgray; 
  border-radius: 1vh;
}

::-webkit-scrollbar-thumb:hover {
  background: black; 
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

@media only screen and (max-width: 920px) {
  .scroll-snap-element {
    scroll-snap-align: start;

    margin-right: 0.5%;
    margin-left: 0.5%;

    min-width: 70% !important;
  }

  .opacity-bar-right {
    position: absolute;
    right: -1%;
    width: 9%;
    height: 100%;
    background: linear-gradient(270deg, var(--color-light) 35.53%, rgba(214, 214, 177, 0) 100%)
  }

  .opacity-bar-left {
    position: absolute;
    left: -1%;
    width: 9%;
    height: 100%;
    visibility: hidden;
    background: linear-gradient(90deg, var(--color-light) 35.53%, rgba(214, 214, 177, 0) 100%);
  }
}
</style>