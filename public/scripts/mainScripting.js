// declaring all variables to manipulate Dom
const slideContainer = document.querySelector('.slide_container');
const sliderImageTwo = document.querySelector('#slider_image_two')
//defining product section links
const productDisplay = document.getElementById('display');
const productFront = document.getElementById('front');
const productBack = document.getElementById('back');
const productSectionContainer = document.querySelector('.product_section_container')
const productImage = document.querySelector('.product_image img')
//user-section-dom
const registerForm = document.querySelector('#register');
const password = document.querySelector('#password')
const confirmPassword = document.querySelector("#confirmPassword");



//change  image on shop page
if(slideContainer){
    //set intervall every 3s;
 setInterval(()=>{
  if(sliderImageTwo.style.display != 'inline-block'){
     
      sliderImageTwo.style.display ="inline-block"
  }else{
      
      sliderImageTwo.style.display ='none'
  }
 },3000)

}


//create listeners to change image on product_detail page
if(productSectionContainer){
  // add event listener on image-front
  productFront.addEventListener('click', e =>{
      e.preventDefault();
      productImage.src = productFront.src
    

  });


  //add event listener for productDisplay
  productDisplay.addEventListener('click', e=>{
     e.preventDefault();
     productImage.src= productDisplay.src;
  })

//add event listener for backimage;
productBack.addEventListener('click', (e)=>{
    e.preventDefault();
    productImage.src = productBack.src
})

}

// check user input on login page

if(registerForm){//there is a registerForm
  registerForm.addEventListener('submit', (e)=>{
        
        if(password.value !== confirmPassword.value){
            alert('passwords no not match try again ')
            registerForm.reset();
            e.preventDefault();
        }
  })
}