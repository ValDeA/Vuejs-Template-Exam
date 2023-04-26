<template>
  <div class="py-4 container-fluid">

    <div class="mt-4 row">
      <div class="col-12">
        <div class="mb-4 card">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-1">전체목록</h6>
            <p class="text-sm">등록된 제품을 표시합니다.</p>
          </div>
          <div class="p-3 card-body">
            <div class="row">
              <default-project-card
                v-for="(item, index) in this.$store.state.device"
                :id=item.device
                :title=item.device
                :image="img1"
                label="Air Signal 100"
                :action="{
                  color: 'success',
                  label: '상세 보기',
                }"
              />
              <!-- <default-project-card
                title="SIA000123"
                :image="img1"
                label="Air Signal 100"
                description=""
                :authors="[
                ]"
                :action="{
                  color: 'success',
                  label: '상세 보기',
                }"
              />

              <default-project-card
                title="Scandinavian"
                :image="img1"
                label="Project #1"
                description="Music is something that every person has his or her own
                      specific opinion about."
                :authors="[
                  {
                    image: team3,
                    name: 'Nick Daniel',
                  },
                  {
                    image: team4,
                    name: 'Peterson',
                  },
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                  {
                    image: team2,
                    name: 'Ryan Milly',
                  },
                ]"
                :action="{
                  color: 'success',
                  label: 'View Project',
                }"
              />

              <default-project-card
                title="Minimalist"
                :image="img1"
                label="Project #3"
                description="Different people have different taste, and various types
                      of music."
                :authors="[
                  {
                    image: team4,
                    name: 'Peterson',
                  },
                  {
                    image: team3,
                    name: 'Nick Daniel',
                  },
                  {
                    image: team1,
                    name: 'Elena Morison',
                  },
                  {
                    image: team2,
                    name: 'Ryan Milly',
                  },
                ]"
                :action="{
                  color: 'success',
                  label: 'View Project',
                }"
              /> -->

              <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
                <place-holder-card
                  :title="{ text: '제품 추가', variant: 'h5' }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
// import img1 from "@/assets/img/as-eye.jpg";
import img1 from "@/assets/img/as-eye-temp.png";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import DefaultProjectCard from "./components/DefaultProjectCard.vue";
import PlaceHolderCard from "@/examples/Cards/PlaceHolderCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "ProfileOverview",
  components: {
    DefaultProjectCard,
    PlaceHolderCard,
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
    };
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
