const openIposElement = document.querySelector(".openIPO-cards");
const emptyIpo = document.querySelector(".empty-ipo");

const upcomingIposElement = document.querySelector(".upcomingIPO-cards");
const emptyUpcoming = document.querySelector(".empty-upcoming");

const companyName = document.querySelector(".company-name");
const openingDateElement = document.querySelector(".open-date");
const closingDateElement = document.querySelector(".close-date");
const issueDesc = document.querySelector(".issue-desc");

const url =
  "https://bizmandu.com/__stock/announcement/announcement/?type=ipo-fpo";

const today = new Date();

const fetchData = async () => {
  const req = await fetch(url);
  const data = await req.json();
  checkOpen(data.message);
};

const checkOpen = (arr) => {
  const upcomingIPOs = arr.filter((item) => {
    let openDate = new Date(item.openDate);
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
      name.innerHTML = `${ipo.company} (${ipo.ticker})`;
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
        ipo.closeDate
      ).toDateString()}`;
      ipoCard.appendChild(closeDate);

      upcomingIposElement.appendChild(ipoCard);
    });
  }

  const openIPOs = arr.filter((item) => {
    let openDate = new Date(item.openDate);
    let closeDate = new Date(item.closeDate);
    return openDate <= today && closeDate > today;
  });
  if (openIPOs.length < 1) {
    openIposElement.style.display = "none";
    emptyIpo.innerHTML = "No Open IPOs/FPOs at the moment.";
  } else {
    openIPOs.map((ipo) => {
      let ipoCard = document.createElement("div");
      ipoCard.classList.add("open");

      let name = document.createElement("h3");
      name.innerHTML = `${ipo.company} (${ipo.ticker})`;
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
        ipo.closeDate
      ).toDateString()}`;
      ipoCard.appendChild(closeDate);
      openIposElement.appendChild(ipoCard);
    });
  }
};
fetchData();
