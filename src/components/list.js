import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/list.css";

function List() {
  // list button
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectorClick = () => {
    setIsOpen(!isOpen);
  };
  // delete update button
  const [openDropdown, setOpenDropdown] = useState(null);
  const handleSelectClick = (event) => {
    const select = event.currentTarget;
    const editors = select.closest(".td-center").querySelector(".editors");

    if (openDropdown && openDropdown !== editors) {
      openDropdown.classList.remove("open-editors");
    }
    editors.style.right = "60px";
    editors.style.top = "50px";
    editors.classList.toggle("open-editors");
    setOpenDropdown(editors);
  };
  // delete
  const LoadDelete = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      fetch("https://coffe-backend-txf2.onrender.com/api/v1/product/" + id, {
        method: "DELETE",
      });
    }
  };

  // delete end

  // edit router
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/edit/" + id);
  };
  // edit router end

  // get product
  const [data, usedata] = useState(null);
  useEffect(() => {
    fetch("https://coffe-backend-txf2.onrender.com/api/v1/product")
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        usedata(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const multpleDelete = async () => {
    let arr = [];
    data.forEach((item) => {
      if (item.select) arr.push(item._id);
    });

    for (let i = 0; i < arr.length; i++) {
      await fetch(
        `https://coffe-backend-txf2.onrender.com/api/v1/product/${arr[i]}`,
        {
          method: "DELETE",
        }
      );

      // Update state to remove the deleted item from the UI
      usedata((prevData) => prevData.filter((item) => item._id !== arr[i]));
    }
  };

  return (
    <div class="mains">
      {/* header  */}
      <header class="header">
        <div class="container">
          <div class="dashboard-main">
            <img class="logo" src="/logo.png" alt="" />
            <ul class="dashboard">
              <li class="dashboard-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clip-path="url(#clip0_202_697)">
                    <path
                      d="M6.75 12H11.25M6.00146 2.39883L3.30146 4.55883C2.63991 5.08807 2.30914 5.35269 2.07105 5.68114C1.86012 5.97212 1.70319 6.29862 1.60774 6.6451C1.5 7.0362 1.5 7.4598 1.5 8.307V11.7C1.5 13.3802 1.5 14.2202 1.82698 14.862C2.1146 15.4265 2.57354 15.8854 3.13803 16.173C3.77976 16.5 4.61984 16.5 6.3 16.5H11.7C13.3802 16.5 14.2202 16.5 14.862 16.173C15.4265 15.8854 15.8854 15.4265 16.173 14.862C16.5 14.2202 16.5 13.3802 16.5 11.7V8.307C16.5 7.4598 16.5 7.0362 16.3923 6.6451C16.2968 6.29862 16.1399 5.97212 15.929 5.68114C15.6909 5.35269 15.3601 5.08807 14.6985 4.55883L11.9985 2.39883C10.9284 1.54271 10.3933 1.11464 9.79989 0.950479C9.27646 0.805673 8.72354 0.805673 8.20011 0.950479C7.6067 1.11464 7.07162 1.54271 6.00146 2.39883Z"
                      stroke="#1A2433"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_202_697">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="dashboard-name">
                  <Link to="/signin">Dashboard</Link>
                </p>
              </li>
              <li class="dashboard-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.3375 17.0625C5.09729 17.0625 3.97719 17.0625 3.12154 16.6265C2.36889 16.243 1.75697 15.6311 1.37347 14.8785C0.9375 14.0228 0.9375 12.9027 0.9375 10.6625V7.3375C0.9375 5.09729 0.9375 3.97719 1.37347 3.12154C1.75697 2.36889 2.36889 1.75697 3.12154 1.37347C3.97719 0.9375 5.09729 0.9375 7.3375 0.9375H10.6625C12.9027 0.9375 14.0228 0.9375 14.8785 1.37347C15.6311 1.75697 16.243 2.36889 16.6265 3.12154C17.0625 3.97719 17.0625 5.09729 17.0625 7.3375V10.6625C17.0625 12.9027 17.0625 14.0228 16.6265 14.8785C16.243 15.6311 15.6311 16.243 14.8785 16.6265C14.0228 17.0625 12.9027 17.0625 10.6625 17.0625H7.3375ZM11.25 6C11.25 7.24264 10.2426 8.25 9 8.25C7.75736 8.25 6.75 7.24264 6.75 6C6.75 4.75736 7.75736 3.75 9 3.75C10.2426 3.75 11.25 4.75736 11.25 6ZM10.25 9.75C11.6307 9.75 12.75 10.8693 12.75 12.25C12.75 12.9404 12.1904 13.5 11.5 13.5H6.5C5.80964 13.5 5.25 12.9404 5.25 12.25C5.25 10.8693 6.36929 9.75 7.75 9.75H10.25Z"
                    fill="#0068B9"
                  />
                </svg>
                <p class="dashboard-name">Contacts</p>
                <svg
                  className="selector"
                  onClick={handleSelectorClick}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 15L12 9L18 15"
                    stroke="#0068B9"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </li>
              <li className={`dashboardOpen ${isOpen ? "open" : ""}`}>
                <div class="open-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="18"
                    viewBox="0 0 14 18"
                    fill="none"
                  >
                    <path
                      d="M0.625 7.02632C0.625 4.42119 0.625 3.11862 1.39384 2.30931C2.16269 1.5 3.40013 1.5 5.875 1.5H8.125C10.5999 1.5 11.8373 1.5 12.6062 2.30931C13.375 3.11862 13.375 4.42119 13.375 7.02632V10.9737C13.375 13.5788 13.375 14.8814 12.6062 15.6907C11.8373 16.5 10.5999 16.5 8.125 16.5H5.875C3.40013 16.5 2.16269 16.5 1.39384 15.6907C0.625 14.8814 0.625 13.5788 0.625 10.9737V7.02632Z"
                      fill="#0068B9"
                      stroke="#0068B9"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.125 8.25H10.75"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.25 9C3.25 9 3.625 9 4 9.75C4 9.75 5.19118 7.875 6.25 7.5"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.125 12.75H10.75"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M4 1.5L4.06165 1.8699C4.2113 2.76783 4.28613 3.21679 4.60085 3.4834C4.91556 3.75 5.37072 3.75 6.28104 3.75H7.71896C8.62928 3.75 9.08444 3.75 9.39915 3.4834C9.71387 3.21679 9.7887 2.76783 9.93835 1.8699L10 1.5"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 12.75H4.75"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="dashboardOpen-name">Lists</p>
                </div>
                <div class="open-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M6.75 1.84351C3.70717 2.7992 1.5 5.64192 1.5 9.00015C1.5 13.1423 4.85786 16.5002 9 16.5002C12.3582 16.5002 15.201 14.293 16.1566 11.2502M12.2 9H14.9C15.4396 9 15.7094 9 15.9452 8.86029C16.1268 8.75263 16.3168 8.51729 16.3838 8.317C16.4707 8.05709 16.4243 7.84191 16.3315 7.41154C15.7132 4.54435 13.4557 2.28682 10.5885 1.66854C10.1581 1.57574 9.94291 1.52934 9.683 1.61621C9.48271 1.68315 9.24737 1.87315 9.13971 2.05483C9 2.29059 9 2.56039 9 3.1V5.8C9 6.9201 9 7.48016 9.21799 7.90798C9.40973 8.28431 9.71569 8.59027 10.092 8.78201C10.5198 9 11.0799 9 12.2 9Z"
                      stroke="#1A2433"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="dashboardOpen-name">Segments</p>
                </div>
              </li>
              <li class="dashboard-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clip-path="url(#clip0_202_730)">
                    <path
                      class="openflexfill"
                      d="M5.25 6H12.75M5.25 9H9.75M5.25 12H11.25M7.9 16.5H10.1C12.3402 16.5 13.4603 16.5 14.316 16.064C15.0686 15.6805 15.6805 15.0686 16.064 14.316C16.5 13.4603 16.5 12.3402 16.5 10.1V7.9C16.5 5.65979 16.5 4.53968 16.064 3.68404C15.6805 2.93139 15.0686 2.31947 14.316 1.93597C13.4603 1.5 12.3402 1.5 10.1 1.5H7.9C5.65979 1.5 4.53968 1.5 3.68404 1.93597C2.93139 2.31947 2.31947 2.93139 1.93597 3.68404C1.5 4.53968 1.5 5.65979 1.5 7.9V10.1C1.5 12.3402 1.5 13.4603 1.93597 14.316C2.31947 15.0686 2.93139 15.6805 3.68404 16.064C4.53968 16.5 5.65979 16.5 7.9 16.5Z"
                      stroke="#1A2433"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_202_730">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="dashboard-name">
                  <Link className="router-link" to="/post">
                    Forms
                  </Link>
                </p>
              </li>
              <li class="dashboard-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    class="openflexfill"
                    d="M10.5 1.875V2.80002C10.5 3.92013 10.5 4.48018 10.718 4.908C10.9097 5.28433 11.2157 5.59029 11.592 5.78204C12.0198 6.00002 12.5799 6.00002 13.7 6.00002H14.625M15 7.90165V11.7C15 13.3802 15 14.2202 14.673 14.862C14.3854 15.4265 13.9265 15.8854 13.362 16.173C12.7202 16.5 11.8802 16.5 10.2 16.5H7.8C6.11984 16.5 5.27976 16.5 4.63803 16.173C4.07354 15.8854 3.6146 15.4265 3.32698 14.862C3 14.2202 3 13.3802 3 11.7V6.3C3 4.61984 3 3.77976 3.32698 3.13803C3.6146 2.57354 4.07354 2.1146 4.63803 1.82698C5.27976 1.5 6.11984 1.5 7.8 1.5H8.59835C9.16907 1.5 9.45442 1.5 9.72825 1.53027C10.6709 1.63446 11.5644 2.00458 12.3046 2.59744C12.5197 2.76966 12.7214 2.97144 13.125 3.375V3.375C13.5286 3.77856 13.7303 3.98034 13.9026 4.19536C14.4954 4.93557 14.8655 5.82913 14.9697 6.77175C15 7.04558 15 7.33093 15 7.90165Z"
                    stroke="#1A2433"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="dashboard-name">Landing Page</p>
              </li>
              <li class="dashboard-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    class="openflexfill"
                    d="M7.5 5.25012L4.5 5.25012C2.84315 5.25012 1.5 6.59327 1.5 8.25012V8.25012C1.5 9.90698 2.84315 11.2501 4.5 11.2501L7.5 11.2501M7.5 5.25012L7.5 11.2501M7.5 5.25012L10.0844 3.4409C11.6092 2.3735 12.3716 1.83979 13.0045 1.84122C13.6539 1.84269 14.2622 2.15938 14.6358 2.69054C15 3.20825 15 4.13888 15 6.00012V6.00012M7.5 11.2501L10.0848 13.0594C11.6093 14.1265 12.3716 14.66 13.0045 14.6586C13.654 14.6571 14.2623 14.3404 14.6359 13.8091C15 13.2915 15 12.361 15 10.5001V10.5001M4.5 11.2501L4.5 14.6251C4.5 15.2464 5.00368 15.7501 5.625 15.7501V15.7501C6.24632 15.7501 6.75 15.2464 6.75 14.6251L6.75 11.2501M15 6.00012V6.00012C16.2426 6.00012 17.25 7.00748 17.25 8.25012V8.25012C17.25 9.49276 16.2426 10.5001 15 10.5001V10.5001M15 6.00012L15 10.5001"
                    stroke="black"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="dashboard-name">Campaign</p>
              </li>

              <li class="dashboard-list2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 3.00003C8.47727 3.00003 7.95991 2.80373 7.63977 2.3905L7.49526 2.20396C6.9244 1.46709 5.89698 1.26519 5.08973 1.73125L4.65931 1.97976C3.85262 2.4455 3.51399 3.43554 3.86647 4.29776L3.95611 4.51703C4.15402 5.00116 4.06626 5.54491 3.80415 5.99751V5.99751C3.54227 6.44972 3.11279 6.80283 2.59502 6.87344L2.36074 6.90538C1.43796 7.03122 0.75 7.81936 0.75 8.75067V9.24938C0.75 10.1807 1.43796 10.9688 2.36074 11.0947L2.59505 11.1266C3.1128 11.1972 3.54227 11.5503 3.80414 12.0025V12.0025C4.06624 12.4551 4.154 12.9988 3.9561 13.483L3.86645 13.7023C3.51398 14.5645 3.85261 15.5545 4.65929 16.0202L5.08976 16.2688C5.89698 16.7348 6.92437 16.5329 7.49522 15.7961L7.63969 15.6096C7.95985 15.1963 8.47724 15 9 15V15V15C9.52282 15 10.0403 15.1963 10.3605 15.6096L10.5048 15.796C11.0757 16.5328 12.103 16.7347 12.9102 16.2687L13.3408 16.0201C14.1474 15.5544 14.486 14.5644 14.1336 13.7022L14.0439 13.4829C13.846 12.9988 13.9338 12.4551 14.1959 12.0025V12.0025C14.4577 11.5503 14.8872 11.1972 15.4049 11.1266L15.6393 11.0947C16.562 10.9688 17.25 10.1807 17.25 9.24938V8.75068C17.25 7.81936 16.562 7.03122 15.6393 6.90538L15.4049 6.87343C14.8872 6.80283 14.4577 6.44973 14.1959 5.99753V5.99753C13.9338 5.54495 13.846 5.00122 14.0439 4.51711L14.1335 4.29785C14.486 3.43565 14.1474 2.44564 13.3407 1.97991L12.9102 1.73133C12.103 1.2653 11.0756 1.46718 10.5048 2.20401L10.3604 2.39044C10.0402 2.80372 9.52279 3.00003 9 3.00003V3.00003V3.00003Z"
                    stroke="#1A2433"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z"
                    stroke="#1A2433"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="dashboard-name">Settings</p>
              </li>
              <li class="dashboard-list3">
                <p class="bigC">C</p>
                <p class="dashboard-name2">Corey Bergson</p>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {/* header end */}
      {/*  main  */}
      <main>
        {/*  section */}
        <section class="section">
          <div class="container2">
            <div class="main-nav">
              <div class="example-list">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.77528 3.72456C9.01935 3.96864 9.01935 4.36437 8.77527 4.60845L4.00889 9.37478H17.5C17.8452 9.37478 18.125 9.6546 18.125 9.99978C18.125 10.345 17.8452 10.6248 17.5 10.6248H4.00888L8.77528 15.3912C9.01935 15.6352 9.01935 16.031 8.77528 16.2751C8.5312 16.5191 8.13547 16.5191 7.89139 16.2751L2.05806 10.4417C1.94085 10.3245 1.875 10.1655 1.875 9.99978C1.875 9.83402 1.94085 9.67504 2.05806 9.55783L7.89139 3.72456C8.13547 3.48048 8.5312 3.48049 8.77528 3.72456Z"
                    fill="#586374"
                  />
                </svg>
                <p class="example-name">Example list</p>
              </div>
              <div class="addcard-main">
                <button class="add-card">
                  <Link className="router-link" to="/post">
                    <svg
                      class="addcard-plus"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.16675 9.99984H10.0001M15.8334 9.99984H10.0001M10.0001 9.99984V4.1665M10.0001 9.99984V15.8332"
                        stroke="white"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Link>
                </button>
                <p class="addcard-name">Add contacts</p>
              </div>
            </div>
          </div>
        </section>
        {/* section end  */}

        {/*  section2 */}
        <section class="section2">
          <div class="container2">
            <div class="search-main">
              <p class="cont-name">10 Contacts</p>
              <div class="searchProduct">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L17.364 17.364M17.364 17.364C18.9926 15.7353 20 13.4853 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.4853 20 15.7353 18.9926 17.364 17.364Z"
                    stroke="#586374"
                    stroke-width="1.2"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class="product-search"
                  type="text"
                  placeholder="Search by email, name or phone..."
                />
              </div>
            </div>
          </div>
        </section>
        {/*  section2 end  */}

        {/* section3 */}
        <section class="section3">
          <div class="container2">
            <div class="date-main">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subscribtion</th>
                    <th>Date Added</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <input
                            type="checkbox"
                            value={item._id}
                            name={item._id}
                            onChange={(e) => {
                              item.select = e.target.checked;
                              usedata(data);
                            }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td class="td-center">
                          <img src="/image/email.png" alt="" />
                          <img src="/image/comment.png" alt="" />
                          <img src="/image/whatsapp.png" alt="" />
                        </td>
                        <td>{item.dateAdded}</td>
                        <td>{item.lastUpdate}</td>
                        <td
                          style={{ position: "relative" }}
                          className="td-center"
                        >
                          <button
                            className="button-dot"
                            onClick={handleSelectClick}
                          >
                            <img src="/image/more-horiz-rec.png" alt="" />
                          </button>
                          <div class="editors">
                            <div class="edit">
                              <button
                                class="delete-btn"
                                onClick={() => {
                                  LoadEdit(item._id);
                                }}
                              >
                                <img src="/image/edit-3.png" alt="" />
                              </button>
                              <p class="editor-name">Edit contact</p>
                            </div>
                            <div class="delete">
                              <button
                                class="delete-btn"
                                // onClick={() => {
                                //   LoadDelete(item._id);
                                // }}
                                onClick={() => {
                                  multpleDelete();
                                }}
                              >
                                <img src="/image/trash.png" alt="" />
                              </button>
                              <p class="editor-name">Delete</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        {/* section3 end  */}
      </main>
      {/* main end */}
    </div>
  );
}

export default List;
