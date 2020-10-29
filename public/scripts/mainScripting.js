// declaring all variables to manipulate Dom
const slideContainer = document.querySelector('.slide_container');
const sliderImageTwo = document.querySelector('#slider_image_two')




//change  image on shop page
if(slideContainer){
 setInterval(()=>{
  if(sliderImageTwo.style.display != 'inline-block'){
      console.log(true)
      sliderImageTwo.style.display ="inline-block"
  }else{
      console.log(false)
      sliderImageTwo.style.display ='none'
  }
 },3000)

}
