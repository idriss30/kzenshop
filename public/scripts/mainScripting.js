

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
//get cart quantity items
const quantityDiv = document.querySelector('.cart_quantity');
const decreaseButton = document.getElementsByClassName('down');
const increaseButton = document.getElementsByClassName('up');
//get the profile variables
const profileSection = document.querySelector('#user-profile');
const orderDetail = document.querySelector('.user-profile_orders')




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



// managing the increase and decrease controller
if(quantityDiv){
    // manage decrease first
    const decreaseButtonArray = Array.from(decreaseButton);
    // decrease function
    decreaseButtonArray.forEach(button =>{
        const id = button.parentElement.lastElementChild.value;
        button.addEventListener('click', (e)=>{
            e.preventDefault();
            axios.get(`http://localhost:4000/cart/decrease/${id}`)
            .then(response =>{
                if(response.data.message === 'success'){
                    window.location.href = 'http://localhost:4000/cart/cartItems'
                    
                }else{
                    alert("sorry can't have less than on item delete instead")
                }
            })
            .catch(err =>{
                console.log(err)
            })

        })
    })
   // create increase Array
    const increaseButtonArray = Array.from(increaseButton)
    increaseButtonArray.forEach(eachIncrease =>{
          const id = eachIncrease.parentElement.lastElementChild.value
          eachIncrease.addEventListener('click', (e)=>{
              e.preventDefault();
              axios.get(`http://localhost:4000/cart/increase/${id}`)
              .then(response =>{
                  if(response.data.message === 'success'){
                    window.location.href = 'http://localhost:4000/cart/cartItems'
                       
                  }else{
                    alert('sorry can not buy more than 10')
                  }
              })
              .catch(err =>{
                  console.log(err)
              })
          })
    })

}

// manage orders pAGE

if(profileSection){
    axios.get('http://localhost:4000/users/orders')
    .then(response =>{
       console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}