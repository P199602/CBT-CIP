const renderCart = document.querySelector(".renderCart");
let Totalprice = [];
let totalElement = null;

function loadCart() {
    Totalprice = [];


    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.forEach((item, index) => {
        let cartItem = document.createElement("div");
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let cartImg = document.createElement("img");
        cartImg.setAttribute("src", item.img);
        cartImg.setAttribute("class", "CartImg");

        let cartTitle = document.createElement("p");
        cartTitle.setAttribute("class", "Name");
        cartTitle.textContent = item.title.slice(0, 25);

        let cartPrice = document.createElement("p");
        cartPrice.setAttribute("class", "PriceCard");
        cartPrice.textContent = `$${item.price}`;

        let removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "btn");
        removeBtn.textContent = "Remove";

        cartItem.appendChild(card);
        Totalprice.push(item.price);

        removeBtn.addEventListener("click", () => {
            cartItems = cartItems.filter((_, i) => i !== index);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart.removeChild(cartItem);
            Totalprice.splice(index, 1);
            if (totalElement) {
                renderCart.removeChild(totalElement);
                totalElement = null;
            }
            loadCart();
        });
        cartItem.appendChild(cartImg);
        cartItem.appendChild(cartTitle);
        cartItem.appendChild(cartPrice);
        cartItem.appendChild(removeBtn);
        renderCart.appendChild(cartItem);
    });
    let Buy = document.createElement("button");
    let btntext = document.createTextNode("Buy");
    Buy.setAttribute("class", "btnBuy");
    Buy.appendChild(btntext);
    renderCart.appendChild(Buy);

    Buy.addEventListener("click", () => {
        alert("Buy button is clicked");
        confirm("Buy the Product")
        let Total = 0;
        for (let i = 0; i < Totalprice.length; i++) {
            Total += Totalprice[i];
        }
        renderCart.innerHTML = `Total Price: $${Total}`;

        let labelName = document.createElement("label");
        labelName.setAttribute("for", "person_name");
        labelName.textContent = "Name:";
        let Name = document.createElement("input");
        Name.setAttribute("id", "person_name");
        Name.setAttribute("name", "person_name");

        let labelEmail = document.createElement("label");
        labelEmail.setAttribute("for", "person_Email");
        labelEmail.textContent = "Email:";
        let Email = document.createElement("input");
        Email.setAttribute("id", "person_Email");
        Email.setAttribute("name", "person_Email");

        let labelMobile = document.createElement("label");
        labelMobile.setAttribute("for", "Mobile");
        labelMobile.textContent = "Mobile:";
        let Mobile = document.createElement("input");
        Mobile.setAttribute("id", "Mobile");
        Mobile.setAttribute("name", "Mobile");

        let PinCode = document.createElement("label");
        PinCode.setAttribute("for", "Pincode");
        PinCode.textContent = "PinCode:";
        let PIN = document.createElement("input");
        PIN.setAttribute("id", "pincode");
        PIN.setAttribute("name", "pincode");


        let submitBtn = document.createElement("button");
        submitBtn.setAttribute("class", "submitBtn");
        submitBtn.setAttribute("type", "submit");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener("click", () => {
            window.location.href = "index.html"; 
        });


        renderCart.appendChild(labelName);
        renderCart.appendChild(Name);
        renderCart.appendChild(labelEmail);
        renderCart.appendChild(Email);
        renderCart.appendChild(labelMobile);
        renderCart.appendChild(Mobile);
        renderCart.appendChild(PinCode);
        renderCart.appendChild(PIN)
        renderCart.appendChild(submitBtn);
        

        localStorage.removeItem('cartItems');
        Totalprice = [];
    });
}

loadCart();
