let tbody = document.querySelector("tbody");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let count = 1;
let totalPages = 0;

let departmentFilter = document.getElementById("departmentFilter");
let genderFilter = document.getElementById("genderFilter");
let salaryFilter = document.getElementById("salaryFilter");

async function fetchData() {
  let res = await fetch(
    `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10`
  );
  let finalData = await res.json();

  totalPages = finalData.totalPages;

  showData(finalData.data);
}

fetchData();

function showData(data) {
  tbody.innerHTML = "";

  data.forEach((ele) => {
    let tRow = document.createElement("tr");
    tRow.id = "tRow";

    let dataSerialNo = document.createElement("td");
    let dataName = document.createElement("td");
    let dataGender = document.createElement("td");
    let dataDepartment = document.createElement("td");
    let dataSalary = document.createElement("td");

    dataSerialNo.textContent = ele.id;
    dataName.textContent = ele.name;
    dataGender.textContent = ele.gender;
    dataDepartment.textContent = ele.department;
    dataSalary.textContent = ele.salary;

    tRow.append(dataSerialNo, dataName, dataGender, dataDepartment, dataSalary);

    tbody.append(tRow);
  });
}

next.addEventListener("click", () => {
  if (count < totalPages) {
    count++;
    fetchData(count);

    if (count >= totalPages) {
      next.disabled = true;
    }
    prev.disabled = false;
  }
});

prev.addEventListener("click", () => {
  if (count > 1) {
    count--;
    fetchData(count);

    if (count === 1) {
      prev.disabled = true;
    }
    next.disabled = false;
  }
});

function filtering() {
  function filterBySalary() {
    salaryFilter.addEventListener("change", () => {
      console.log(salaryFilter.value);

      async function fetchDatathree() {
        let res = await fetch(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10&sort=salary&order=${salaryFilter.value}`
        );

        let finalData3 = await res.json();
        showData(finalData3.data);
      }

      fetchDatathree();
    });
  }
  filterBySalary();

  function filterByDepartment() {
    departmentFilter.addEventListener("change", () => {
      async function fetchDataone() {
        let res = await fetch(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10&filterBy=department&filterValue=${departmentFilter.value}`
        );

        let finalData2 = await res.json();
        showData(finalData2.data);
      }

      fetchDataone();
    });
  }

  filterByDepartment();

  function filterByGender() {
    genderFilter.addEventListener("change", () => {
      async function fetchDatatwo() {
        let res = await fetch(
          `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${count}&limit=10&filterBy=gender&filterValue=${genderFilter.value}`
        );

        let finalData1 = await res.json();
        showData(finalData1.data);
      }

      fetchDatatwo();
    });
  }

  filterByGender();
}

filtering();
