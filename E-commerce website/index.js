const renderData = document.querySelector(".renderData");

async function getData() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        console.log(data);

        data.forEach((ele) => {
            console.log(ele);
            let createIDEle = document.createElement("div");
            createIDEle.setAttribute("class", "product");

            let createImageEle = document.createElement("img");
            createImageEle.setAttribute("src", ele.image);
            createImageEle.setAttribute("class", "ProductImg");
            createIDEle.appendChild(createImageEle);

            let createNameEle = document.createElement("p");
            createNameEle.setAttribute("class", "Name");
            createNameEle.textContent = ele.title.slice(0, 25);
            createIDEle.appendChild(createNameEle);

            let createPriceEle = document.createElement("p");
            createPriceEle.setAttribute("class", "price");
            createPriceEle.textContent = `Price: $${ele.price}`;
            createIDEle.appendChild(createPriceEle);

            let btnEle = document.createElement("button");
            btnEle.setAttribute("class", "Addtocart");
            let btnText = document.createTextNode("Add to cart");
            btnEle.appendChild(btnText);
            createIDEle.appendChild(btnEle);

            btnEle.addEventListener("click", () => addToCart(ele.image, ele.price, ele.title));

            renderData.appendChild(createIDEle);
        });

    } catch (error) {
        "Error fetching data:", error;
    }
}

function addToCart(img, price, title) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push({ img, price, title });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert('Item added to cart');
}

getData();
