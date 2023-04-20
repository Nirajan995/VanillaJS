let backendProducts = [];
//using fetch api async/await
const getProducts = async () => {
   //const let - block scoped variable
   const response = await fetch('http://localhost:8080/api/v1/products');
   const product = await response.json();

   // console.log(product.limit)
   //object destructuring
   const { data } = product;

   localStorage.setItem("products", JSON.stringify(data))

};

//Function called when edit button is clicked
const submitEditHandler = (product) => {
   document.getElementById('editproductName').value = product.title;

}

//Function called when delete button is clicked
const submitDeleteHandler = async (product) => {
   const response = await fetch(`http://localhost:8080/api/v1/products/${product['_id']}`, {
      method: 'DELETE'
   });
   const deletedProd = await response.json();

   const prods = localStorage.getItem("products");
   const filteredProd = JSON.parse(prods).filter((prod) => {
      return prod._id !== product._id;
   })
   localStorage.setItem("products", filteredProd);
   window.location.reload();
}

//This is the button click for add product from the modal.
const addProductHandler = async (event) => {
   event.preventDefault();
   const productName = document.getElementById('productName').value;
   const productDescription = document.getElementById('productDescription').value;
   const productImage = document.getElementById('productImage').value;

   let prod = {
      title: productName,
      description: productDescription,
      thumbnail: productImage
   }

   //Calling backend POST API for adding new product
   const response = await fetch('http://localhost:8080/api/v1/products', {
      headers: {
         'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(prod)
   });

   const submittedData = await response.json();

   if (submittedData.status) {
      setTimeout(() => { document.location.reload(); }, 0);
   }

}


getProducts();



if (localStorage.getItem("products") !== null) {

   //getting item from local storage
   backendProducts = localStorage.getItem("products");
   const products = JSON.parse(backendProducts);

   // console.log(products)
   products.forEach((product) => {
      const div = document.createElement("div");
      div.style = "width: 23%"
      div.className = "card m-2";

      const image = document.createElement("img");
      image.className = 'h-75'
      image.src = product.thumbnail;

      const p = document.createElement("p");
      p.className = "text-center";
      p.innerText = product.title;

      const editButton = document.createElement('button');
      editButton.className = 'btn btn-primary mb-2';
      editButton.innerText = 'Edit';

      editButton.addEventListener('click', (event) => {
         event.preventDefault();
         //function call
         submitEditHandler(product);
      })

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger';
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', (event) => {
         event.preventDefault();
         //function call
         submitDeleteHandler(product);

      })

      div.append(image);
      div.append(p);
      div.append(editButton);
      div.append(deleteButton);

      //append divs in container to html
      const container = document.getElementById("container");
      container.append(div);

   })


} else {
   document.getElementById('container').innerHTML = 'No data found';
}

