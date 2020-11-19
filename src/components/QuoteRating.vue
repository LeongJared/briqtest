<template>
    <v-container>
        <v-row id="jokesetup" class="text-center">
            
            <v-col>
                <h2 class="headline font-weight-bold mb-3">
                    Please rate this joke
                </h2>
                <v-row>
                    <!-- Grabs the setup value from jokes that was brought in with the axios call in the script at the bottom, will be updated after being rated -->
                    <v-col>
                        <p dense> {{ jokes.setup }} </p>
                    </v-col>
                </v-row>
                <v-col>
                    <!-- Button to show the punchline to the users, allows them to guess or wait before showing the punchline -->
                    <v-btn
                    color="accent"
                    elevation="6"
                    small
                    @click="show = true"
                 >Show the Punchline!</v-btn>
                </v-col>
                <v-col>
                    <!-- Similar to the setup, however will start off being hidden and will only be visible after clicking the button above. Will be hidden again after being rated -->
                    <p id="punchline" dense v-if="show"> {{ jokes.punchline }} </p>
                </v-col>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col>
                <!-- This is the rating system that will mark what the user rated it, this will be stored in rating in script for the update when they request a new joke -->
                <v-rating
                    v-model="rating"
                    color="yellow darken-2"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    hover
                    size="45"
                    value=$event
                ></v-rating>
                <!-- This makes it easy for the person to identify where to press to get their next joke. Originally it changed automatically after being rated,
                however the user may still want to read the joke after rating it. -->
                <v-btn
                    elevation="2"
                    @click="show = false; updateInput(rating, jokes)"
                >Show the next joke!</v-btn>
            </v-col>
        </v-row>
        <v-col style="position:fixed; bottom:0; font-size:18px" class="text-center">
            <footer><a href="https://github.com/15Dkatz/official_joke_api" target="_blank" rel="noopener">Github of API used to obtain jokes</a></footer>
        </v-col>
    </v-container>
</template>

<script>
//Axios was the most documented means for both GETting and POSTing to and from APIs, making it easier to implement
import axios from 'axios'
    export default {
        name: 'jokes',
        data: () => ({
            jokes: null,
            rating: 0,
            show: false
        }),
        mounted() {
            //Axios call that pulls a random joke from the API to start off with
            axios.get("https://official-joke-api.appspot.com/jokes/random")
                .then(response => {
                    this.jokes = response.data
                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        methods: {
            //Prints the value of what the user rated the prior joke, originally intended to be POSTed for quotes
            updateInput(value, jokes) {
                console.log(value);
                var jokeType = jokes.type
                var jokeID = jokes.id
                //If they really liked a particular joke by rating it a 5, they will get a joke of the same type
                while(jokes.id == jokeID) {
                    if(value == 5) {
                        //If they rated a general joke as a 5 it will continue to give them general jokes
                        if(jokeType == "general") {
                            axios.get("https://official-joke-api.appspot.com/jokes/general/random")
                                .then(response => {
                                    this.jokes = response.data[0]
                                    console.log(response.data)
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                        //If they really liked a programming joke then it will continue to give them a programming joke
                        else if(jokeType == "programming") {
                            axios.get("https://official-joke-api.appspot.com/jokes/programming/random")
                                .then(response => {
                                    this.jokes = response.data[0]
                                    console.log(response.data)
                                    console.log("test")
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                        //If they really like a joke that was a knock-knock joke it will continue to display knock-knock jokes to them
                        else if(jokeType == "knock-knock") {
                            axios.get("https://official-joke-api.appspot.com/jokes/knock-knock/random")
                                .then(response => {
                                    this.jokes = response.data[0]
                                    console.log(response.data)
                                    console.log("test")
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                        /*This is used to catch if there are more than 3 types of jokes. At present this shouldn't ever 
                        be used as only general, knock-knock, and programming exist*/
                        else {
                            axios.get("https://official-joke-api.appspot.com/jokes/random")
                                .then(response => {
                                    this.jokes = response.data[0]
                                    console.log(response.data)
                                    console.log("test")
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                    }
                    else if(value == 1) {
                        //Create a random number that will be in this order, 0 general, 1 programming, 2 knock-knock
                        var randomInt=Math.floor(Math.random() * Math.floor(3))
                        //So long as the previous disliked joke was not a general joke this joke type can be randomly selected
                        if(randomInt == 0) {
                            if(jokeType != "general") {
                                axios.get("https://official-joke-api.appspot.com/jokes/general/random")
                                    .then(response => {
                                        this.jokes = response.data[0]
                                        console.log(response.data)
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                            }
                        }
                        //So long as the previous disliked joke was not a programming joke this joke type can be a randomly selected
                        else if(randomInt == 1) {
                            if(jokeType != "programming") {
                                axios.get("https://official-joke-api.appspot.com/jokes/programming/random")
                                    .then(response => {
                                        this.jokes = response.data[0]
                                        console.log(response.data)
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                            }
                        }
                        //So long as the previous disliked joke was not a knock-knock joke this joke type can be randomly selected
                        else if(randomInt == 2) {
                            if(jokeType != "knock-knock") {
                                axios.get("https://official-joke-api.appspot.com/jokes/knock-knock/random")
                                    .then(response => {
                                        this.jokes = response.data[0]
                                        console.log(response.data)
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                            }
                        }
                        //Used if new joke types are added
                        else {
                            axios.get("https://official-joke-api.appspot.com/jokes/random")
                                .then(response => {
                                    this.jokes = response.data[0]
                                    console.log(response.data)
                                })
                                .catch(function (error) {
                                    console.log(error)
                                })
                        }
                    
                    }
                    //Any other values that the rating might have been, this also catches if some error such as negative or above 5 come into the picture without tripping an error
                    else {
                        axios.get("https://official-joke-api.appspot.com/jokes/random")
                            .then(response => {
                                this.jokes = response.data
                                console.log(response.data)
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    }
                    //Is needed because after pulling a new joke it would make it an object and would be unable to access it and print it in the above section.
                    jokes = JSON.parse(JSON.stringify(this.$root.jokes))
                }
            }
        }
    }
    
</script>