const displayPhones = (phones, isShowAll) => {
  // console.log(phones.length);
  const showBtn = document.getElementById("show-btn");
  console.log(isShowAll);

  if (phones.length > 12 && !isShowAll) {
    phones = phones.slice(0, 12);
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `p-5 flex flex-col items-center bg-base-100 shadow-xl rounded-lg`;
    phoneCard.innerHTML = `
         <figure class="mb-3">
                  <img
                    src= "${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="text-center space-y-3">
                  <h2 class="text-2xl font-bold text-[#403F3F]">${phone.phone_name}</h2>
                  <p class="text-lg text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
                  <div class="card-actions justify-center">
                    <button onclick="showdetails('${phone.slug}')" class="btn bg-[#0D6EFD] text-white">Show Details</button>
                  </div>
                </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  const data = document.getElementById("data-error");
  loading(false);
  if (phones.length > 0) {
    data.classList.add("hidden");
  } else {
    data.classList.remove("hidden");
  }
};

const loadPhones = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const loading = (isLoading) => {
  const loadSpinner = document.getElementById("load-spinner");
  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};

const searchHandler = (isShowAll) => {
  loading(true);
  const searchField = document.getElementById("search-text");
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
};

const showAllHandler = () => {
  searchHandler(true);
};

const showdetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneInfoDiv = document.getElementById("phone-info");
  phoneInfoDiv.innerHTML = `
  <div class="bg-[#C4D9FF] p-4 rounded-lg"><img class="mx-auto" src="${phone.image}"></div>
  <h3 class="text-[#403F3F] text-2xl font-bold">${phone.name}</h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Storage: <span class="text-[#706F6F]">${phone?.mainFeatures?.storage}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Display: <span class="text-[#706F6F]">${phone?.mainFeatures?.displaySize}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Chipset: <span class="text-[#706F6F]">${phone?.mainFeatures?.chipSet}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Memory: <span class="text-[#706F6F]">${phone?.mainFeatures?.memory}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Slug: <span class="text-[#706F6F]">${phone.slug}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Release date: <span class="text-[#706F6F]">${phone.releaseDate}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">Brand: <span class="text-[#706F6F]">${phone.brand}</span></h3>
  <h3 class="text-[#403F3F] text-xl font-semibold">GPS: <span class="text-[#706F6F]">${phone?.others?.GPS}</span></h3>
  `;
  details_modal.showModal();
};

// loadPhones("iphone",true);
