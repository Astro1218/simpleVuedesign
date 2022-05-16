<template>
    <div class="card bg-basic pcard_set" v-bind:slot="carddata">
        <img
            class="card-img-top pcard_img"
            :src="carddata.images[0].url"
            alt="Card image"
            style="width:100%;"
        />
        <div class="more_state">
            <p class="small_tx">Learn More</p>
        </div>
        <div class="card-img-overlay" style="padding : 0px">
        <p class="title_tx">RECIPE OF THE DAY</p>
        <h1 class="body_tx">{{carddata.title}}</h1>
        <div class="d-flex" style="margin : 0px 16px 0px 16px;">
            <div v-for="count in recipesrate" :key="count.id">
                <b-icon
                    :icon="(count.val == 0 ? 'star' : (count.val == 1 ? 'star-half' : 'star-fill') )"
                    font-scale="0.7"
                    style="color:orange"
                >
                </b-icon>
            </div>
        </div>
        <div class="d-flex" style="margin : 0px 16px 10px 16px; float : left">
            <div class="cur_state_tx" style="padding-right : 8px;">
            {{carddata.preparationTimeMinutes > 60 ? (Math.floor(carddata.preparationTimeMinutes/60)+"hr " + carddata.preparationTimeMinutes%60 + "min") : carddata.preparationTimeMinutes + "min"}}
            <b-icon icon="dot" font-scale="1" style="color : white"></b-icon>
            {{userstate == 1 ? carddata.details.energy + "Calories" : carddata.details.energy*4.2 + "KJ"}}
            </div>
        </div>
        <div class="inc">
            <b-icon icon="dot" font-scale="2" style="color : red"></b-icon>{{carddata.details.nutrients.carbs}}{{carddata.details.units.carbs}}
            <b-icon icon="dot" font-scale="2" style="color : blue"></b-icon>{{carddata.details.nutrients.proteins}}{{carddata.details.units.proteins}}
            <b-icon icon="dot" font-scale="2" style="color : orange"></b-icon>{{carddata.details.nutrients.fats}}{{carddata.details.units.fats}}
        </div>
        </div>
    </div>
</template>

<style scoped>
.pcard_set {
  max-width: 340px;
  background: #ffffff;
  box-shadow: 0px 13px 35px rgba(0, 30, 47, 0.1);
  border-radius: 12px;
}

.pcard_set > img:hover {
  opacity: 0.8 !important;
  cursor: pointer;
}

.title_tx {
  font-family: "Proxima Nova";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  padding-top: 45px;
  padding-left: 16px;
  margin-bottom: 0px;
  color: #1bc98e;
}

.pcard_img {
  height: 218px;
  border-radius: 12px;
  filter: brightness(60%);
}

.more_state {
  position: absolute;
  bottom: 23px;
  background: rgb(255, 255, 255, 0.4);
  border-radius: 15px;
  right: 16px;
  font-family: "Proxima Nova";
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
}
.small_tx {
  color: #ffffff;
  font-family: "Proxima Nova";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  margin: 8px;
}
.body_tx {
  text-align: left;
  font-family: "Proxima Nova";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  color: #ffffff;
  margin: 2px 16px 2px 16px;
}
.cur_state_tx {
  font-family: "Proxima Nova";
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}
.inc {
  position: absolute;
  left: 10px;
  bottom: 20px;
  font-family: "Proxima Nova";
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}
</style>

<script>
    export default {
        name: "CardImg",
        props : {
            carddata : {
                type: Object,
                required: true
            },
            userdata : {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                userstate: 0,
                recipesrate : []
            };
        },
        created() {
            this.userstate = this.$props.userdata.energyUnits == "calories" ? 1 : 0;
            var total = this.$props.carddata.rating.score*2;
            for(var j=0; j< 5; j++){
                this.recipesrate[j] = {id : j, val : 0};
            }
            for(var i=0; i < 10; i++){
                this.recipesrate[Math.floor(i/2)].val += ((total-1) >= 0 ? 1 : 0); 
                total--;
            }
        }
    };
</script>
