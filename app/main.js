// Fetch and render meal categories
async function fetchMealCategories() {
  const mealContainer = document.getElementById("meal-container");

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await response.json();

    mealContainer.innerHTML = "";

    data.categories.forEach((category) => {
      const categoryCard = document.createElement("div");
      categoryCard.className =
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300";

      categoryCard.innerHTML = `
        <img
          src="${category.strCategoryThumb}"
          alt="${category.strCategory}"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold">${category.strCategory}</h2>
        </div>
      `;

      mealContainer.appendChild(categoryCard);
    });
  } catch (error) {
    console.error("Error fetching meal categories:", error);
  }
}

// Fetch and render meals
async function fetchMeals() {
  const mealList = document.getElementById("meal-list");

  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a");
    const data = await response.json();

    mealList.innerHTML = "";

    data.meals.forEach((meal) => {
      const mealCard = document.createElement("div");
      mealCard.className =
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer";
      mealCard.dataset.mealId = meal.idMeal;

      mealCard.innerHTML = `
        <div class="p-4">
          <h2 class="text-lg font-semibold">${meal.strMeal}</h2>
        </div>
      `;

      mealCard.addEventListener("click", () => fetchMealDetails(meal.idMeal));
      mealList.appendChild(mealCard);
    });
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

// Fetch and render full meal details
async function fetchMealDetails(mealId) {
  const mealDetailsSection = document.getElementById("meal-details");

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];

    mealDetailsSection.innerHTML = `
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex flex-col items-start lg:items-center">
          <img
            src="${meal.strMealThumb}"
            alt="${meal.strMeal}"
            class="w-64 h-64 object-cover rounded-lg shadow-md mr-6"
          />
          <div>
            <h2 class="text-2xl font-bold mb-2">${meal.strMeal}</h2>
            <p class="text-gray-600 mb-2"><strong>Category:</strong> ${meal.strCategory}</p>
            <p class="text-gray-600 mb-2"><strong>Area:</strong> ${meal.strArea}</p>
            <p class="text-gray-600 mb-4">${meal.strInstructions}</p>
            <h3 class="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul class="list-disc pl-6 text-gray-600">
              ${Array.from({ length: 20 })
        .map((_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient
            ? `<li>${ingredient} - ${measure}</li>`
            : "";
        })
        .join("")}
            </ul>
          </div>
        </div>
        <a
          href="${meal.strYoutube}"
          target="_blank"
          class="inline-block mt-4 text-blue-500 hover:underline"
        >
          Watch on YouTube
        </a>
      </div>
    `;

    mealDetailsSection.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching meal details:", error);
  }
}

// Initialize app
fetchMealCategories();
fetchMeals();
