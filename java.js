document.addEventListener('DOMContentLoaded', function() {
    const shopping = document.querySelector('#shopping');
    const cartSection = document.getElementById('cart-section');
    const mainContent = document.querySelector('.main');
    let isCartVisible = false;
    const checkout = document.querySelector('#checkout')
    function check(){
        alert('your order placed successfully')
        const toremove = document.getElementById('cart-items')
        if(toremove){
            toremove.innerHTML=''
        }
        document.getElementById('total-amount').textContent= 'Total: ₹0'
        if (isCartVisible) {
            cartSection.style.right = '-300px';
            mainContent.classList.remove('newmain');
        } else {
            cartSection.style.right = '0px';
            mainContent.classList.add('newmain');
        }
        isCartVisible = !isCartVisible;
    }
    checkout.addEventListener('click',check)
    

    shopping.addEventListener('click', function() {
        if (isCartVisible) {
            cartSection.style.right = '-300px';
            mainContent.classList.remove('newmain');
        } else {
            cartSection.style.right = '0px';
            mainContent.classList.add('newmain');
        }
        isCartVisible = !isCartVisible;
        });

    let cartitems = document.getElementById('cart-items')
    const addtocart = document.querySelectorAll('.add-to-cart')
    addtocart.forEach(button=>{
        button.addEventListener('click',()=>{
            const product =button.closest('.product')
            const productName = product.querySelector('.p-name').textContent.trim();
            const productimage = product.querySelector('img')
            const productPrice = product.querySelector('.price').textContent.trim();
            if(productimage){
                const line =document.createElement('hr')
                const cartItem = document.createElement('li');
                cartItem.className='ele'
                const trash = document.createElement('div')
                trash.innerHTML='<i class="fa-solid fa-trash"></i>'
                trash.className='trash'
                const newimg = document.createElement('img')
                newimg.src=productimage.src
                newimg.className='image'
                
                cartItem.appendChild(newimg)
                const textNode = document.createTextNode(`${productName} - ${productPrice}`)
                cartItem.appendChild(textNode)
                cartItem.appendChild(trash)
                cartitems.appendChild(cartItem);
                cartitems.appendChild(line)
                setTimeout(() => {
                    cartItem.classList.add('animate-in');
                    
                }, 0);
                updateTotalAmount();
                trash.addEventListener('click',clearli)
            }
            else{
                console.log('Product image not found')
            }
            }
            
)
    })
    function clearli(event){
        const trash=event.target
        const li = trash.closest('.ele')
        if(li){
            const productPriceText = li.textContent.split(' - ')[1].replace('₹', '').trim();
            const productPrice = parseFloat(productPriceText); 
            const line = li.nextElementSibling
            li.classList.add('exit');
            if (line && line.tagName === 'HR') {
                line.classList.add('exit');
            }
            setTimeout(()=>{
                li.remove()
                if(line && line.tagName==='HR'){
                line.remove()
                }
                updateTotalAmount()
            },500)
            
        }     
    }
    function updateTotalAmount() {
        let totalAmount = 0;
        const cartItems = cartitems.querySelectorAll('li');
        cartItems.forEach(item => {
            const priceText = item.textContent.split(' - ')[1].replace('₹', '').trim();
            const price = parseFloat(priceText);
            totalAmount += price;
        });
        document.getElementById('total-amount').textContent = `Total: ₹${totalAmount}`;
    }
});
