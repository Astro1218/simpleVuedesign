<template>
	<div>
		<div v-for="item in recipesdata" v-bind:key="item.id">
			<div>
				<div class="card-group">
					<Card :carddata=item :userdata="userinfo" :fav=0></Card>
				</div>
				<div class="card-group">
					<CardImg :carddata=item :userdata="userinfo"></CardImg>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Card from "./Card.vue";
import CardImg from "./CardImg.vue";
const axios = require("axios");
export default {
  components: { Card, CardImg },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
	data() {
		return {
			userinfo: [],
			recipesdata: [],
		};
	},
	async created() {
		// GET request using axios with async/await
		const response1 = await axios.get("http://127.0.0.1:3000/user");
		this.userinfo = response1.data;
		const response2 = await axios.get("http://127.0.0.1:3000/recipes");
		this.recipesdata = response2.data;
	},
};
</script>
