document.getElementById("viewmore").addEventListener("click", function() {
    document.getElementById("adoptsection").scrollIntoView({ behavior: "smooth" });
});






const loadCategories = () =>
    {
        //fetch the data 
    //console.log("load categories created");
    
        fetch ("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch ((error) => console.log(error));
    
    
    }
    const displayCategories = (categories) =>
        {
    
            const categoryContainer = document.getElementById("categories");
            
    
       categories.forEach((item) => {
        //console.log(item);
    
        //create a button
        const buttonContainer= document.createElement("div");
        buttonContainer.innerHTML =`<button id="btn-${item.category}" onclick="loadPetsByCategory('${item.category}')" class="btn category-btn btn-xl  items-center px-20 py-3 border-2 border-gray-300 rounded-xl shadow-md mb-3 ">
        
        <img src="${item.category_icon}" alt="${item.category}" width="30">
        <span>${item.category}</span>
        </button>`;
   

       
        categoryContainer.append(buttonContainer);
    
        //add button to caategory container
        //categoryContainer.append(button);
       });
        
    
        };



        const showSpinner = (elementId) => {
            const container = document.getElementById(elementId);
        
            // Optional: Clear content first
            container.innerHTML = "";
        
            // Create wrapper div
            const spinnerWrapper = document.createElement("div");
            spinnerWrapper.className = "col-span-full flex justify-center items-center w-full min-h-[150px]";
        
            // Set spinner HTML
            spinnerWrapper.innerHTML = `
                <div class="flex gap-1">
                    <span class="loading loading-bars loading-lg text-green-500"></span>
                    <span class="loading loading-bars loading-lg text-green-500"></span>
                    <span class="loading loading-bars loading-lg text-green-500"></span>
                </div>
            `;
        
            container.appendChild(spinnerWrapper);
        };
        


        const loadPets = () =>
            {
                showSpinner("petscard");
                
                //fetch the data 
           // console.log("load all pets");
                fetch ("https://openapi.programming-hero.com/api/peddy/pets")
                .then((res) => res.json())
                .then((data) => {
                    // Delay displaying pets by 2 seconds to simulate loading
                    setTimeout(() => displayPets(data.pets), 2000);
                })
                .catch ((error) => console.log(error));
            
            
            };
        
            const displayPets = (pets) => {
                 //console.log(pets);
                
                const PetsContainer = document.getElementById("petscard");
                PetsContainer.innerHTML = "";
                if(pets.length == 0)
                {
                    PetsContainer.classList.remove("grid");
                
        PetsContainer.innerHTML = `
                    <div class = "min-h-[300px] w-full mx-auto flex flex-col gap-5 justify-center items-center">
                    <img src = "images/error.webp"/>
                    <h2 class = "font-bold text-2xl">
                   
                    No information available</h2>
                     <p class="text-sm text-gray-500  text-center"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br>
                                  its layout. The point of using Lorem Ipsum is that it has a.</p>
                    
                    `;
                }
                else{
                    PetsContainer.classList.add("grid");
                }
  
                
                pets.forEach((item) =>{
                    //console.log(id);
                    const card = document.createElement("div");
        card.classList = "card bg-base-100  shadow-sm"
        card.innerHTML =` <img
      src=${item.image}
      class = " object-cover"
      alt="Shoes" />
      <div class="card-body p-4">
                    <h2 class="card-title m-2 font-bold text-xl">${item.pet_name}</h2>
                    <p>🐾 <strong >Breed:</strong> ${item.breed}</p>
                    <p>📅 <strong>Birth:</strong> ${item.date_of_birth}</p>
                    <p>♀️ <strong>Gender:</strong> ${item.gender}</p>
                    <p>💰 <strong>Price:</strong> ${item.price} $</p>
                    <div class="card-actions justify-between mt-4">
                    
                     <button class="like-btn text-2xl text-gray-400 hover:text-red-500 transition">
                        <i class="fa-regular fa-thumbs-up"></i>
                    </button>
        
                        <button class="btn btn-outline btn-sm text-green-500 shadow-lg">Adopt</button>
                        <button class="btn btn-outline btn-info btn-sm  text-green-500 shadow-lg">Details</button>
                    </div>
                </div>
      
      
      
      `
      
      
      
      
      ;
                
  PetsContainer.appendChild(card);
                
    })
}


    const loadPetsByCategory = (categoryName) => {
        showSpinner("petscard"); 
    //alert(categoryName);
   // Remove 'active' class from all category buttons
   const allButtons = document.querySelectorAll(".category-btn");
   allButtons.forEach((btn) => btn.classList.remove("active"));

   // Convert category name to safe ID (same logic)
   const safeId = `btn-${categoryName.replace(/\s+/g, "-")}`;

   const activebtn = document.getElementById(safeId);
   if (activebtn) {
       activebtn.classList.add("active");
   } else {
       console.warn(`Button with id ${safeId} not found`);
   }
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((data) =>
        {

            
           
            displayPets (data.data)}
)
        
    
    .catch((error) => console.error("Error loading category pets:", error))
    };
 
            
    
loadCategories();
loadPets();