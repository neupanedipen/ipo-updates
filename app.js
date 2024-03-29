const openIposElement = document.querySelector(".openIPO-cards");
const emptyIpo = document.querySelector(".empty-ipo");

const closingTodayEle = document.querySelector("#closingToday");

const upcomingIposElement = document.querySelector(".upcomingIPO-cards");
const emptyUpcoming = document.querySelector(".empty-upcoming");

const companyName = document.querySelector(".company-name");
const openingDateElement = document.querySelector(".open-date");
const closingDateElement = document.querySelector(".close-date");
const issueDesc = document.querySelector(".issue-desc");
const loadingContainer = document.querySelector("#loading");

const displayLoading = () => {
  document.querySelector(".container").style.visibility = "hidden";
  loadingContainer.style.display = "block";
};

const hideLoading = () => {
  loadingContainer.style.display = "none";
  document.querySelector(".container").style.visibility = "visible";
};

const url = "https://www.onlinekhabar.com/smtm/home/ipo-corner-upcoming";

const today = new Date();

const fetchData = async () => {
  displayLoading();
  const req = await fetch(url);
  const data = await req.json();
  checkOpen(data.message);
  hideLoading();
};

const checkOpen = (arr) => {
  const closingToday = arr.filter((ipo) => {
    return (
      new Date(ipo.close_date).toLocaleDateString() ==
      today.toLocaleDateString()
    );
  });

  if (closingToday.length > 0) {
    let closingTitle = document.createElement("h2");
    closingTitle.innerHTML = "Issues Closing Today";
    closingTodayEle.appendChild(closingTitle);

    closingToday.map((ipo) => {
      let closingToday = document.createElement("div");
      closingToday.classList.add("closingToday");

      let name = document.createElement("h3");
      name.innerHTML = `${ipo.company_name} (${ipo.ticker})`;
      closingToday.appendChild(name);

      let description = document.createElement("p");
      description.innerHTML = `<strong>Description: </strong> ${ipo.details}`;
      closingToday.appendChild(description);

      let openDate = document.createElement("p");
      openDate.innerHTML = `<strong>Open Date: </strong> ${new Date(
        ipo.openDate
      ).toDateString()}`;
      closingToday.appendChild(openDate);
      document.body.appendChild(closingToday);

      let closeDate = document.createElement("p");
      closeDate.innerHTML = `<strong>Close Date:</strong> ${new Date(
        ipo.close_date
      ).toDateString()}`;
      closingToday.appendChild(closeDate);

      closingTodayEle.appendChild(closingToday);
    });
  }

  const upcomingIPOs = arr.filter((item) => {
    let openDate = new Date(item.open_date);
    let closeDate = new Date(item.closeDate);
    return closeDate > today && openDate > today;
  });

  if (upcomingIPOs.length < 1) {
    upcomingIposElement.style.display = "none";
    emptyUpcoming.innerHTML = "No Upcoming IPOs/FPOs at the moment.";
  } else {
    upcomingIPOs.map((ipo) => {
      let ipoCard = document.createElement("div");
      ipoCard.classList.add("open");

      let name = document.createElement("h3");
      name.innerHTML = `${ipo.company_name} (${ipo.ticker})`;
      ipoCard.appendChild(name);

      let description = document.createElement("p");
      description.innerHTML = `<strong>Description: </strong> ${ipo.details}`;
      ipoCard.appendChild(description);

      let openDate = document.createElement("p");
      openDate.innerHTML = `<strong>Open Date: </strong> ${new Date(
        ipo.openDate
      ).toDateString()}`;
      ipoCard.appendChild(openDate);
      document.body.appendChild(ipoCard);

      let closeDate = document.createElement("p");
      closeDate.innerHTML = `<strong>Close Date:</strong> ${new Date(
        ipo.close_date
      ).toDateString()}`;
      ipoCard.appendChild(closeDate);

      upcomingIposElement.appendChild(ipoCard);
    });
  }

  const openIPOs = arr.filter((item) => {
    let openDate = new Date(item.openDate);
    let closeDate = new Date(item.closeDate);
    return openDate <= today && closeDate >= today;
  });
  if (openIPOs.length < 1) {
    openIposElement.style.display = "none";
    emptyIpo.innerHTML = "No Open IPOs/FPOs at the moment.";
  } else {
    openIPOs.map((ipo) => {
      let ipoCard = document.createElement("div");
      ipoCard.classList.add("open");

      let name = document.createElement("h3");
      name.innerHTML = `${ipo.company_name} (${ipo.ticker})`;
      ipoCard.appendChild(name);

      let description = document.createElement("p");
      description.innerHTML = `<strong>Description: </strong> ${ipo.details}`;
      ipoCard.appendChild(description);

      let openDate = document.createElement("p");
      openDate.innerHTML = `<strong>Open Date: </strong> ${new Date(
        ipo.openDate
      ).toDateString()}`;
      ipoCard.appendChild(openDate);
      document.body.appendChild(ipoCard);

      let closeDate = document.createElement("p");
      closeDate.innerHTML = `<strong>Close Date:</strong> ${new Date(
        ipo.close_date
      ).toDateString()}`;
      ipoCard.appendChild(closeDate);
      openIposElement.appendChild(ipoCard);
    });
  }
};
fetchData();
