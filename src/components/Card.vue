<template>
    <div class="card bg-basic pcard_set" v-bind:slot="carddata"  v-on:click = "set_fav()">
        <img
        class="card-img-top pcard_img" :src="carddata.images[0].url" alt="Card image" style="width:100%;"
        />
        <b-icon class="fav_icon" v-bind:state="fav_state" :icon="(fav_state == 1 ? 'heart-fill' : 'heart')" style="color : green" font-scale="1.5"></b-icon>
        <div class="fav_state">
            <p class="small_tx">
                <b-icon
                icon="emoji-heart-eyes"
                font-scale="0.8"
                style="color: white;"
                ></b-icon>
                Premium Recipe
            </p>
        </div>
        <div class="card-body" style="padding : 0px">
        <div class="body_tx" style="height : 60px;">
            {{carddata.title}}
        </div>
        <div class="d-flex rate_tx" style="margin : 8px 16px 8px 16px;">
            <div class="" v-for="count in recipesrate" :key="count.id">
                <b-icon
                    :icon="(count.val == 0 ? 'star' : (count.val == 1 ? 'star-half' : 'star-fill') )"
                    font-scale="0.7"
                    style="color:orange"
                >
                </b-icon>
            </div>  {{carddata.rating.count}} ratings
        </div>
        <div class="d-flex" style="margin : 0px 16px 10px 16px; float : left">
            <div class="d-flex">
            <div style="padding-right : 8px;">
                <div class="cur_state_tx"><b-icon icon="clock"></b-icon> {{carddata.preparationTimeMinutes > 60 ? (Math.floor(carddata.preparationTimeMinutes/60)+"hr " + carddata.preparationTimeMinutes%60 + "min") : carddata.preparationTimeMinutes + "min"}}</div>
            </div>
            <div style="padding-right : 8px;">
                <div class="cur_state_tx">
                <b-icon icon="droplet-half"></b-icon> {{userstate == 1 ? carddata.details.energy + "Calories" : carddata.details.energy*4.2 + "KJ"}}
                </div>
            </div>
            </div>

            <div class="inc">
                <b-icon icon="dot" font-scale="2" style="color : red"></b-icon>{{carddata.details.nutrients.carbs}}{{carddata.details.units.carbs}}
                <b-icon icon="dot" font-scale="2" style="color : blue"></b-icon>{{carddata.details.nutrients.proteins}}{{carddata.details.units.proteins}}
                <b-icon icon="dot" font-scale="2" style="color : orange"></b-icon>{{carddata.details.nutrients.fats}}{{carddata.details.units.fats}}
            </div>
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

  .pcard_img {
    height: 200px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .fav_icon {
    position: absolute;
    color: white;
    right: 16px;
    top: 10px;
  }

  .fav_state {
    position: absolute;
    top: 160px;
    background: rgb(255, 255, 255, 0.3);
    border-radius: 10px;
    left: 16px;
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
    color: #0c0c0a;
    margin: 8px 16px 8px 16px;
  }
  .rate_tx {
    font-family: "Proxima Nova";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    padding-top: 4px;
    color: #1ca677;
    margin-bottom: 10px;
  }
  .cur_state_tx {
    font-family: "Proxima Nova";
    font-size: 12px;
    line-height: 14px;
    color: #393c40;
  }
  .inc {
    position: absolute;
    right: 16px;
    bottom: 5px;
    font-family: "Proxima Nova";
    font-size: 12px;
    line-height: 14px;
    color: #393c40;
  }
</style>
<script>

export default {
    name : "Card",
    props : {
        carddata : {
            type: Object,
            required: true
        },
        userdata : {
            type: Object,
            required: true
        },
        fav : {
            type : Number,
            required : true
        }    
    },
    data() {
		return {
            userstate: 0,
            recipesrate : [],
            fav_state : this.fav
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
    },
    methods : {
        set_fav : function() {
            return this.fav_state =  (this.fav_state + 1) % 2;
        }
    },
};
</script>
