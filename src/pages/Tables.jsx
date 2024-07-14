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
}from "antd";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  SearchOutlined
} from "@ant-design/icons";

import { useEffect, useState, useCallback, useContext } from "react";
import { getToken } from "../utill/helpers";
import { GloblaContext } from "../context";
import UserModal from "../components/userDetails/UserModal";
import { useLocation } from 'react-router-dom'
import dayjs from "dayjs";


function Tables() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const myParam = params.get('collection');
  const [index, setIndex] = useState(0);
  const sortOrder = ["", "asc", "desc"];
  const [header, setHeader] = useState(null);
  const [exheader, setExheader] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [result, setResult] = useState(null);
  const [defaultServey, setDefaultServey] = useState("1");
  const [userModalData, setUserModalData] = useState(null);
  const [searchInput, setSearchINput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState(null)
  const [loader, setLoader] = useState(false)
  const [headers,setHearders]=useState()
   const { setLoaders } = useContext(GloblaContext);
  
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
          width:"100%",
          height:"100%",
          margin:"0px",
         
        }}
        onClick={() => handleSortOrder(field)}
      >
        {label}
        {renderOrderIcon(field)}
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

  const getGraphsData = async (email,date) => {
 
  
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

      getGraphsData(data.data.attributes.Email,data.data.attributes.createdAt)
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

  const sort = sortOrder[index] && header + ":" + sortOrder[index];

  const fetchData = useCallback(async () => {
    setLoader(true);

    const query = qs.stringify(
      {
        pagination: {
          page: currentPage,
          pageSize: itemsPerPage,
        },
        sort,
      },
      {
        encodeValuesOnly: true,
      }
    );

    

    try {
      const response = await fetch(`${API}/all-packes?[filters][Form][$eq]=${title}&${query}`,{
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
  }, [currentPage, servey, sort, setResult, setTotalPages, itemsPerPage]);

  useEffect(() => {
    if (getToken()) {
      fetchData();
    }
  }, [fetchData]);

  const showTotal = () => `Total ${total} items`;

  const source = result && convertData(result.data);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };

  // const DropdownMenu = ({ items }) => (
  //   <Menu>
  //     {items.map((item) => (
  //       <Menu.Item key={item.value}>{item.label}</Menu.Item>
  //     ))}
  //   </Menu>
  // );
 

  return (
    <>
      <div>
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
          <h2  className="tableTextColor">{headers}</h2>
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
             value={startDate ? dayjs(new Date(startDate)) :null}
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
            <Row justify="center" style={{ padding: "20px 0"}}>
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
      {userDetailsModel && graphData !== null && title !== null && userModalData !== null && servey !==null && <UserModal graphData={graphData} table={userModalData.data.attributes.Form} servey={servey} data={userModalData} />}
    </>
  );
}

export default Tables;