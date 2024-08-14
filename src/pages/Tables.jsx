import qs from "qs";

import {
  Pagination,
  Row,
  Col,
  Card,
  Table,
  Button,
  Input,
  DatePicker,
} from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined
} from "@ant-design/icons";

import { useEffect, useState, useCallback, useContext } from "react";
import { getToken, getUserData } from "../utill/helpers";
import { GloblaContext } from "../context";
import UserModal from "../components/userDetails/UserModal";
import { useLocation } from 'react-router-dom'
import dayjs from "dayjs";
import { AuthContext, useAuthContext } from "../context/authContext";
import PayLineChart from "../components/charts/PayLineChart";
import HerizontalBarChart from "../components/charts/HerizontalBarChart";
import WeightChart from "../components/charts/WeigthGraph";


function Tables() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myParam = params.get('collection');
  const [index, setIndex] = useState(0);
  const [indexPay, setIndexPay] = useState(0);
  const sortOrder = ["", "asc", "desc"];
  const sortOrderPay = ["", "asc", "desc"];
  const [header, setHeader] = useState(null);
  const [headerPay, setHeaderPay] = useState(null);
  const [exheader, setExheader] = useState(null);
  const [currentPagePay, setCurrentPagePay] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPagesPay, setTotalPagesPay] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPagePay, setItemsPerPagePay] = useState(10);
  const [result, setResult] = useState(null);
  const [defaultServey, setDefaultServey] = useState("1");
  const [userModalData, setUserModalData] = useState(null);
  const [searchInput, setSearchINput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchInputPay, setSearchINputPay] = useState("");
  const [startDatePay, setStartDatePay] = useState(null);
  const [endDatePay, setEndDatePay] = useState(null);
  const [graphData, setGraphData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [loaderPayment, setLoaderPayment] = useState(false)
  const [headers, setHearders] = useState()
  const [paymentData, setPaymentData] = useState(null)
  const [paymentDataForGraph, setPaymentDataForGraph] = useState(null)

  const { setLoaders } = useContext(GloblaContext);
  const { userPosition } = useContext(GloblaContext);
  const API = process.env.REACT_APP_API;


  const handleSortOrder = (field) => {
    if (exheader === field) {
      if (index !== 2) {
        const newIndex = index + 1;
        setIndex(newIndex);
      } else {
        setIndex(0);
      }
    } else {
      setIndex(1);
    }

    setHeader(field);

    if (currentPage !== 1) {
      setCurrentPage(1);
    }

    setExheader(field);
  };
  const handleSortOrderForPayment = (field) => {
    if (exheader === field) {
      if (indexPay !== 2) {
        const newIndex = indexPay + 1;
        setIndexPay(newIndex);
      } else {
        setIndexPay(0);
      }
    } else {
      setIndexPay(1);
    }

    setHeaderPay(field);

    if (currentPagePay !== 1) {
      setCurrentPagePay(1);
    }

    setExheader(field);
  };


  const renderOrderIcon = (field) => {
    return (
      <span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CaretUpOutlined style={{ color: sortOrder[index] === 'asc' && field === header ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }} />
          <CaretDownOutlined style={{ color: sortOrder[index] === 'desc' && field === header ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }} />
        </div>
      </span>
    );
  }

  const renderHeader = (label, field) => {
    return (
      <span
        style={{
          cursor: "pointer",
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: "100%",
          height: "100%",
          margin: "0px",

        }}
        onClick={() => handleSortOrder(field)}
      >
        {label}
        {renderOrderIcon(field)}
      </span>
    );
  };
  const renderOrderIconPayment = (field) => {
    return (
      <span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CaretUpOutlined style={{ color: sortOrderPay[indexPay] === 'asc' && field === headerPay ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }} />
          <CaretDownOutlined style={{ color: sortOrderPay[indexPay] === 'desc' && field === headerPay ? '#1890ff' : 'rgba(0, 0, 0, 0.25)' }} />
        </div>
      </span>
    );
  }

  const renderHeaderForpayment = (label, field) => {
    return (
      <span
        style={{
          cursor: "pointer",
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: "100%",
          height: "100%",
          margin: "0px",

        }}
        onClick={() => handleSortOrderForPayment(field)}
      >
        {label}
        {renderOrderIconPayment(field)}
      </span>
    );
  };

  let columns = [
    {
      title: renderHeader("Nom", "Nom"),
      dataIndex: "name",
      key: "name",

      // width: "32%",
    },
    {
      title: renderHeader("Prénom", "Prenom"),
      dataIndex: "last",
      key: "last",

    },
    {
      title: renderHeader("Adresse E-mail", "Email"),
      key: "email",
      dataIndex: "email",

    },
    {
      title: renderHeader("Register Date", "createdAt"),
      key: "registerDate",
      dataIndex: "registerDate",

    },
    {
      title: "Actions",
      key: "action",
      dataIndex: "action",
    },
  ];
  let columnsPymentTable = [
    {
      title: renderHeaderForpayment("Nom", "Name"),
      dataIndex: "Name",
      key: "Name",

      // width: "32%",
    },
    {
      title: renderHeaderForpayment("Adresse E-mail", "Email"),
      key: "Email",
      dataIndex: "Email",

    },
    {
      title: renderHeaderForpayment("PaymentID", "PaymentID"),
      key: "PaymentID",
      dataIndex: "PaymentID",

    },
    {
      title: renderHeaderForpayment("Package", "Package"),
      key: "package",
      dataIndex: "package",

    },
    {
      title: renderHeaderForpayment("Register Date", "createdAt"),
      key: "registerDate",
      dataIndex: "registerDate",

    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <span onClick={() => handleServeyChange("1")}>FICHE PACK STARTER</span>
      ),
      servey: "fiche-pack-starters",
      title: "FICHE PACK STARTER",
      populateOptions: [
        "civility",
        "Medical",
        "eat",
        "meal",
        "gym",
        "measure",
        "sport",
        "FichePackStarter",
      ],
    },
    {
      key: "2",
      label: (
        <span onClick={() => handleServeyChange("2")}>
          FICHE PACK VIP PREMIUM
        </span>
      ),
      servey: "fiche-pack-vip-premiums",
      title: "FICHE PACK VIP PREMIUM",
      populateOptions: [
        "civility",
        "Medical",
        "eat",
        "meal",
        "gym",
        "measure",
        "sport",
        "FichePackVipPremium",
      ],
    },
    {
      key: "3",
      label: (
        <span onClick={() => handleServeyChange("3")}>
          PACK TRAINING ATHLÈTE
        </span>
      ),
      servey: "pack-training-athletes",
      title: "PACK TRAINING ATHLÈTE",
      populateOptions: [
        "civility",
        "Medical",
        "eat",
        "meal",
        "gym",
        "measure",
        "sport",
        "PackTrainingAthlete",
      ],
    },
    {
      key: "4",
      label: (
        <span onClick={() => handleServeyChange("4")}>
          FICHE PACK SPÉCIFIQUE NUTRITION
        </span>
      ),
      servey: "fiche-pack-specifique-nutritions",
      title: "FICHE PACK SPÉCIFIQUE NUTRITION",
      populateOptions: [
        "civility",
        "Medical",
        "eat",
        "meal",
        "gym",
        "measure",
        "sport",
        "FichePackSpecifiqueNutritIion",
      ],
    },
    {
      key: "5",
      label: (
        <span onClick={() => handleServeyChange("5")}>
          CHECK UP HEBDOMADAIRE PACK VIP
        </span>
      ),
      servey: "check-up-hebdomadaire-pack-vips",
      title: "CHECK UP HEBDOMADAIRE PACK VIP",
      populateOptions: ["review", "sleep"],
    },
    {
      key: "6",
      label: (
        <span onClick={() => handleServeyChange("6")}>
          CHECK UP BI-MENSUEL PACK STARTE
        </span>
      ),
      servey: "check-up-bi-mensuel-pack-startes",
      title: "CHECK UP BI-MENSUEL PACK STARTE",
      populateOptions: ["review", "CheckUpBiMensuelPackStarteEx"],
    },
    {
      key: "7",
      label: (
        <span onClick={() => handleServeyChange("7")}>
          BILAN MENSUEL PACK VIP PREMIUM
        </span>
      ),
      servey: "bilan-mensuel-pack-vip-premiums",
      title: "BILAN MENSUEL PACK VIP PREMIUM",
      populateOptions: ["review", "sleep", "measure"],
    },
    {
      key: "8",
      label: (
        <span onClick={() => handleServeyChange("8")}>
          BILAN MENSUEL PACK STARTER
        </span>
      ),
      servey: "bilan-mensuel-pack-starters",
      title: "BILAN MENSUEL PACK STARTER",
      populateOptions: ["review", "sleep", "measure"],
    },
    {
      key: "9",
      label: (
        <span onClick={() => handleServeyChange("9")}>
          BILAN MENSUEL PACK NUTRITION
        </span>
      ),
      servey: "bilan-mensuel-pack-nutritions",
      title: "BILAN MENSUEL PACK NUTRITION",
      populateOptions: ["review", "sleep", "measure"],
    },
  ];


  const { userDetailsModel, setUserDetailsModel } =
    useContext(GloblaContext);

  const handleServeyChange = useCallback(
    (serveyKey) => {

      setCurrentPage(1);
      setDefaultServey(serveyKey);
    },
    [setCurrentPage, setDefaultServey]
  );


  useEffect(() => {
    if (myParam) {
      const selectedTable = items.find(item => item.servey === myParam);
      setCurrentPage(1);
      setDefaultServey(selectedTable.key);
    }
  }, [myParam])

  const { title, servey, populateOptions } = items.filter(
    (item) => item.key === defaultServey
  )[0];

  const getGraphsData = async (email, date) => {


    const greater = new Date(date).getFullYear() + '-01-01T00:00:00.000Z';
    const lessDate = new Date(date).getFullYear() + '-12-29T23:59:59.999Z';



    try {
      const response = await fetch(
        `${API}/all-packes?[filters][Form][$eq]=${title}&[filters][Email][$eq]=${email}&[filters][createdAt][$gt]=${greater}&[filters][createdAt][$lt]=${lessDate}&populate=review&populate=measure`, // Assuming `servey` should be `survey`
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();

      setGraphData(data)





    } catch (err) {
      console.log(err);
    }

  };

  const fetchDataByIdAndTableName = async (ids) => {
    try {
      setLoaders(true);

      const response = await fetch(
        `${API}/all-packes/${ids}?populate=*`
        , {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();


      setUserModalData(data)

      getGraphsData(data.data.attributes.Email, data.data.attributes.createdAt)
      setLoaders(false);
    } catch (err) {
      setLoaders(false);
      console.log(err);
    }
  };

  const goForSearch = async () => {
    try {
      const response = await fetch(
        `${API}/all-packes?[filters][Form][$eq]=${title}&${searchInput ? `[filters][Nom][$contains]=${searchInput}` : null
        }&${startDate ? `[filters][createdAt][$gte]=${startDate}` : null}&${endDate ? `[filters][createdAt][$lte]=${endDate}` : null
        }`
        , {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json()
      setResult(data);
      setCurrentPage(1)
    } catch (err) {
      console.log(err);
    }
  };
  const goForSearchPayment = async () => {
    try {
      const response = await fetch(
        `${API}/payments?[filters][Package][$eq]=${title}&${searchInputPay ? `[filters][Name][$contains]=${searchInputPay}` : null
        }&${startDatePay ? `[filters][createdAt][$gte]=${startDatePay}` : null}&${endDatePay ? `[filters][createdAt][$lte]=${endDatePay}` : null
        }`
        , {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json()
      setPaymentData(data);
      setCurrentPage(1)
    } catch (err) {
      console.log(err);
    }
  };

  const convertData = (data) => {
    return data.map((item) => {
      const info = item.attributes;
      return {
        key: item.id.toString(),
        name: info?.Nom,
        last: info?.Prenom,
        email: info?.Email,
        registerDate: info?.createdAt.slice(0, 10),
        action: (
          <Button
            className="tableButtons"
            onClick={() => {
              fetchDataByIdAndTableName(item.id);
              setUserDetailsModel(true);
            }}
          >
            Read More
          </Button>
        ),
      };
    });
  };
  const convertDataPay = (data) => {
    return data.map((item) => {
      const info = item.attributes;
      return {
        key: item.id.toString(),
        Name: info?.Name,
        Email: info?.Email,
        package: info?.Package,
        PaymentID: info?.PaymentID,
        registerDate: info?.createdAt.slice(0, 10),
      };
    });
  };

  const sorttt = sortOrder[index] && header + ":" + sortOrder[index];
  const sortPay = sortOrderPay[indexPay] && headerPay + ":" + sortOrderPay[indexPay];

  const fetchData = useCallback(async () => {

    setLoader(true);


    const query = qs.stringify(
      {
        pagination: {
          page: currentPage,
          pageSize: itemsPerPage,
        },

      },
      {
        encodeValuesOnly: true,
      }
    );



    try {
      const user = getUserData()
      const emailFilter = user.positiion === 'sporter' ? `&[filters][Email][$eq]=${user.email}` : '';
      const response = await fetch(`${API}/all-packes?[filters][Form][$eq]=${title}&${emailFilter}&sort=${sorttt}&${query}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();

      setResult(data);
      setEndDate(null);
      setSearchINput("");
      setStartDate(null);
      setTotal(data.meta.pagination.total);
      setTotalPages(data.meta.pagination.pageCount);
      setLoader(false);
      setHearders(title)

    } catch (error) {
      setLoader(false);
      console.error("Error fetching posts:", error);
      throw error;
    }
  }, [currentPage, servey, sorttt, setResult, setTotalPages, itemsPerPage]);


  const fetchDataPayment = useCallback(async () => {
    setLoaderPayment(true);

    const query = qs.stringify(
      {
        pagination: {
          page: currentPagePay,
          pageSize: itemsPerPagePay,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );



    try {
      const user = getUserData()
      console.log(user.email)
      const emailFilter = user.positiion !== 'admin' ? `&[filters][Email][$eq]=${user.email}` : '';
      const payments = await fetch(`${API}/payments?[filters][Package][$eq]=${title}&${emailFilter}&sort=${sortPay}&${query}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!payments.ok) {
        throw new Error(payments.status);
      }

      const pay = await payments.json()


      setPaymentData(pay)

      setEndDatePay(null);
      setSearchINputPay("");
      setStartDatePay(null);
      setTotalPay(pay.meta.pagination.total);
      setTotalPagesPay(pay.meta.pagination.pageCount);
      setLoaderPayment(false);
      setHearders(title)

    } catch (error) {
      setLoaderPayment(false);
      console.error("Error fetching posts:", error);
      throw error;
    }
  }, [currentPagePay, servey, sortPay, setPaymentData, setTotalPagesPay, itemsPerPagePay]);

  useEffect(() => {
    if (getToken()) {
      fetchData();

    }
  }, [currentPage, servey, sorttt, setResult, setTotalPages, itemsPerPage]);
  useEffect(() => {
    if (getToken()) {

      fetchDataPayment()
    }
  }, [currentPagePay, servey, sortPay, setPaymentData, setTotalPagesPay, itemsPerPagePay]);


  const showTotal = () => `Total ${total} items`;
  const showTotalPay = () => `Total ${totalPay} items`;

  const source = result && convertData(result.data);
  const sourcePay = paymentData && convertDataPay(paymentData.data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageChangePay = (page) => {
    setCurrentPagePay(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };
  const onShowSizeChangePay = (current, pageSize) => {
    setItemsPerPagePay(pageSize);
    setCurrentPagePay(1);
  };

  // const DropdownMenu = ({ items }) => (
  //   <Menu>
  //     {items.map((item) => (
  //       <Menu.Item key={item.value}>{item.label}</Menu.Item>
  //     ))}
  //   </Menu>
  // );
  const countAllmony = (data) => {
    let total = 0
    data?.map((item) => (
      total = total + item?.attributes?.Price
    ))
    return total
  }

  const userDetails = getUserData()



  
  return (
    <div className="bg-white -m-6">
      <div className="m-6">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24 tabled tableTextColor"

        // extra={
        //   <Dropdown
        //     overlay={<DropdownMenu items={items} />}
        //     trigger={["click"]}
        //     placement="bottomRight"
        //   >
        //     <Button>
        //       Choisissez une autre enquête
        //     </Button>
        //   </Dropdown>
        // }
        >
          <h2 className="tableTextColor">{headers}</h2>
          <div className="searchFields">
            <Button

              className="tableButtons"
              onClick={() => fetchData()}
            >
              all
            </Button>
            <Input
              type="text"
              id="start"
              className="datepicker"
              placeholder="Nom"
              value={searchInput}
              onChange={(e) => {
                setSearchINput(e.target.value);
              }}
            />
            <label>from:</label>
            <DatePicker
              placeholder="Select Start Date"
              className="datepicker"
              value={startDate ? dayjs(new Date(startDate)) : null}
              onChange={(date) =>
                setStartDate(date?.format().slice(0, 10) + "T00:00:00.000Z")
              }
            />
            <label>to:</label>
            <DatePicker
              placeholder="Select End Date"
              picker="date"
              className="datepicker"
              value={endDate ? dayjs(new Date(endDate)) : null}
              onChange={(date) =>
                setEndDate(date?.format().slice(0, 10) + "T23:59:59.999Z")
              }
            />
            <Button
              className="tableButtons"
              onClick={() => goForSearch()}
            >
              <SearchOutlined size={40} style={{ fontSize: '20px' }} />
            </Button>
          </div>
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={source}
              pagination={false}
              loading={loader}
              bordered
            // size="small"

            />
            <Row justify="center" style={{ padding: "20px 0" }}>
              <Col>
                <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowSizeChange}
                  showQuickJumper
                  showTotal={showTotal}
                  current={currentPage}
                  total={totalPages * itemsPerPage}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}

                  className="paginationTextColor"
                />
              </Col>
            </Row>
          </div>
        </Card>
      </div>

      <div className="m-6">
        <Card
          bordered={false}
          className="criclebox tablespace mb-24 tabled tableTextColor"

        >
          <h2 className="tableTextColor">{headers} Payments</h2>

          <div className="searchFields">
            <Button

              className="tableButtons"
              onClick={() => fetchDataPayment()}
            >
              all
            </Button>
            <Input
              type="text"
              id="start"
              className="datepicker"
              placeholder="Nom"
              value={searchInputPay}
              onChange={(e) => {
                setSearchINputPay(e.target.value);
              }}
            />
            <label>from:</label>
            <DatePicker
              placeholder="Select Start Date"
              className="datepicker"
              value={startDatePay ? dayjs(new Date(startDatePay)) : null}
              onChange={(date) =>
                setStartDatePay(date?.format().slice(0, 10) + "T00:00:00.000Z")
              }
            />
            <label>to:</label>
            <DatePicker
              placeholder="Select End Date"
              picker="date"
              className="datepicker"
              value={endDatePay ? dayjs(new Date(endDatePay)) : null}
              onChange={(date) =>
                setEndDatePay(date?.format().slice(0, 10) + "T23:59:59.999Z")
              }
            />
            <Button
              className="tableButtons"
              onClick={() => goForSearchPayment()}
            >
              <SearchOutlined size={40} style={{ fontSize: '20px' }} />
            </Button>
          </div>
          <div className="table-responsive">
            <Table
              columns={columnsPymentTable}
              dataSource={sourcePay}
              pagination={false}
              loading={loaderPayment}
              bordered
            // size="small"

            />
            {userDetails.positiion === "admin" ? (<div className=" flex flex-col gap-2">
              <h3 className="bg-gray-300 text-white p-2 gap-2">Totla Money :<span className="text-red"> {countAllmony(paymentData?.data)}$</span></h3>
            </div>) : null}

            <Row justify="center" style={{ padding: "20px 0" }}>

              <Col>
                <Pagination
                  showSizeChanger
                  onShowSizeChange={onShowSizeChangePay}
                  showQuickJumper
                  showTotal={showTotalPay}
                  current={currentPagePay}
                  total={totalPagesPay * itemsPerPagePay}
                  pageSize={itemsPerPagePay}
                  onChange={handlePageChangePay}

                  className="paginationTextColor"
                />
              </Col>
            </Row>
          </div>
        </Card>

        {(title === "FICHE PACK VIP PREMIUM" || title === "FICHE PACK STARTER" || title === "PACK TRAINING ATHLÈTE" || title === "FICHE PACK SPÉCIFIQUE NUTRITION") && userDetails.positiion === "admin" &&
          (
            <div>
              <div className="grid gap-10 ms:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 items-center">

                <div className="mb-4 w-auto p-5">
                  {title !== null && <HerizontalBarChart servey={title} />}
                </div>


                <div className="mb-4 w-auto p-5">
                  {title !== null && <WeightChart servey={title} />}
                </div>
              </div>


              {title !== "PACK TRAINING ATHLÈTE" && (
                <div className="grid gap-10 ms:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 mx-auto items-center justify-center">

                  <div className="mb-4 w-2/3 mx-auto">
                    {paymentData !== null && title !== null && <PayLineChart servey={title} />}
                  </div>
                </div>
              )}

            </div>
          )


        }

      </div>
      {userDetailsModel && graphData !== null && title !== null && userModalData !== null && servey !== null && <UserModal graphData={graphData} table={userModalData.data.attributes.Form} servey={servey} data={userModalData} />}
    </div>
  );
}

export default Tables;