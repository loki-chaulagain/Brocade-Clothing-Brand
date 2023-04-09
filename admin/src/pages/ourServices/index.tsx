import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import OurServicesTable from "../../components/ourServices/OurServicesTable";
import { MiscellaneousContext } from "../../../context/MiscellaneousContext";
import Api from "../../../service/Api.js";
import TableHeading from "../../components/TableHeading";
import AddServiceDialog from "../../components/ourServices/AddServiceDialog";
let CallApi = new Api();

function Portfolio() {
  const { deleteSuccess, somethingWentWrong } = useContext(MiscellaneousContext);
  const [isUpdated, setIsUpdated] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("latest");

  const deleteService = async (id: any) => {
    try {
      let res = await CallApi.deleteData(`service/${id}`);
      setIsUpdated(1);
      deleteSuccess();
      console.log("Review deleted success");
    } catch (error) {
      console.log(error);
      somethingWentWrong();
    }
  };

  const [page, setPage] = useState(1);
  const [serviceTotalCount, setServiceTotalCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(5);

  const handleNext = () => {
    setPage(page + 1);
    setCurrentCount(currentCount + 5);
  };

  const handlePrev = () => {
    setPage(page - 1);
    setCurrentCount(currentCount - 5);
  };

  const [services, setServices] = useState([]);
  const fetchAllService = async () => {
    try {
      let res = await CallApi.fetchData(`service?page=${page}&size=${5}&search=${searchInput}&sort=${sort}`);
      setServices(res.allService);
      setServiceTotalCount(res.totalServiceCount);
      setIsUpdated(0);
    } catch (error) {
      console.log(error);
      somethingWentWrong();
    }
  };

  useEffect(() => {
    fetchAllService();
  }, [isUpdated, page, searchInput, sort]);

  return (
    <>
      <Header pageTitle={"Our Services"} />

      <div className="d-flex align-items-center justify-content-between gap-4 ">
        <TableHeading heading={`All Services (${serviceTotalCount})`} />

        <input
          type="text"
          className="form-control w-50 custom_input_search"
          id="searchInput"
          placeholder="Search By Title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          onChange={(e) => setSort(e.target.value)}
          className="form-select custom_input_search w-50"
          aria-label="Sort Select">
          <option
            value="latest"
            selected>
            Latest
          </option>
          <option value="oldest">Oldest</option>
        </select>
        <AddServiceDialog setIsUpdated={setIsUpdated} />
      </div>

      <OurServicesTable
        services={services}
        deleteService={deleteService}
        setIsUpdated={setIsUpdated}
        serviceTotalCount={serviceTotalCount}
        currentCount={currentCount}
      />
      <div className="d-flex justify-content-end me-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={currentCount > 5 ? "page-item" : "disabled"}>
              <a
                className="page-link rounded-0 h6 next_prev_pagination"
                onClick={handlePrev}>
                Previous
              </a>
            </li>

            <li className={serviceTotalCount - 1 >= currentCount ? "page-item" : "disabled"}>
              <a
                className="page-link rounded-0 h6 next_prev_pagination "
                onClick={handleNext}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Portfolio;
